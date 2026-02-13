import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Storage "blob-storage/Storage";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Admin Controls & Initialization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  module Member {
    public type Status = { #active; #blocked; #deactivated };
    public type Gender = { #male; #female; #other };
  };

  public type Birthday = {
    day : Nat8; // 1-31
    month : Nat8; // 1-12
    year : Nat16; // 1900-2100
  };

  public type Member = {
    id : Text;
    name : Text;
    dob : Birthday;
    gender : Member.Gender;
    phone : Text;
    email : Text;
    address : Text;
    photo : Storage.ExternalBlob;
    designation : Text;
    referralId : Text;
    joiningDate : Text;
    status : Member.Status;
  };

  public type Referral = {
    referrerId : Text; // Member who made the referral
    referredId : Text; // Newly registered member
    timestamp : Text;
    successful : Bool; // Whether the referral resulted in a successful registration
  };

  public type Donation = {
    id : Text;
    donorName : Text;
    memberId : ?Text;
    amount : Nat;
    paymentMode : Text;
    transactionId : Text;
    date : Text;
    campaignId : ?Text;
    receiptNumber : Text;
  };

  public type Certificate = {
    id : Text;
    recipientName : Text;
    issueDate : Text;
    certificateType : Text;
    qrCode : Text;
    templateId : Text;
  };

  public type Beneficiary = {
    id : Text;
    name : Text;
    address : Text;
    contactDetails : Text;
    helpType : Text;
    helpHistory : [Text];
    documents : { id : Text; blob : Storage.ExternalBlob };
  };

  public type Campaign = {
    id : Text;
    title : Text;
    description : Text;
    goalAmount : Nat;
    startDate : Text;
    endDate : Text;
    amountRaised : Nat;
    status : Text;
  };

  public type Enquiry = {
    id : Text;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Text;
    replied : Bool;
  };

  public type UserProfile = {
    name : Text;
    memberId : ?Text;
    role : Text;
  };

  // Store all the collections in persistent state
  let members = Map.empty<Text, Member>();
  let referrals = Map.empty<Text, Referral>();
  let donations = Map.empty<Text, Donation>();
  let certificates = Map.empty<Text, Certificate>();
  let beneficiaries = Map.empty<Text, Beneficiary>();
  let campaigns = Map.empty<Text, Campaign>();
  let enquiries = Map.empty<Text, Enquiry>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Member system
  public shared ({ caller }) func registerMember(newMemberData : Member) : async Text {
    // Public registration allowed - guests can register to become members
    let memberId = newMemberData.id;
    let memberWithActiveStatus = {
      newMemberData with status = #active;
    };
    members.add(memberId, memberWithActiveStatus);
    memberId;
  };

  public shared ({ caller }) func addMemberReferral(referrerId : Text, referredId : Text, timestamp : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add referrals");
    };
    if (members.get(referrerId) == null) {
      Runtime.trap("Referrer does not exist");
    };
    let referral = {
      referrerId;
      referredId;
      timestamp;
      successful = true;
    };
    referrals.add(referredId, referral);
  };

  public shared ({ caller }) func blockMember(memberId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can block members");
    };
    let member = switch (members.get(memberId)) {
      case (null) { Runtime.trap("Member does not exist") };
      case (?m) { m };
    };
    let updatedMember = { member with status = #blocked };
    members.add(memberId, updatedMember);
  };

  public shared ({ caller }) func unblockMember(memberId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can unblock members");
    };
    let member = switch (members.get(memberId)) {
      case (null) { Runtime.trap("Member does not exist") };
      case (?m) { m };
    };
    let updatedMember = { member with status = #active };
    members.add(memberId, updatedMember);
  };

  public shared ({ caller }) func deactivateMember(memberId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can deactivate members");
    };
    let member = switch (members.get(memberId)) {
      case (null) { Runtime.trap("Member does not exist") };
      case (?m) { m };
    };
    let updatedMember = { member with status = #deactivated };
    members.add(memberId, updatedMember);
  };

  // Donation Management system
  public shared ({ caller }) func createDonation(newDonation : Donation) : async () {
    // Public donations allowed - both members and guests can donate
    if (donations.containsKey(newDonation.id)) {
      Runtime.trap("Donation already exists");
    };
    donations.add(newDonation.id, newDonation);
  };

  public query ({ caller }) func getDonationsByCampaignId(campaignId : Text) : async [Donation] {
    // Public query - anyone can view campaign donations
    donations.values().toArray().filter(
      func(donation) {
        switch (donation.campaignId) {
          case (null) { false };
          case (?campaign) { campaign == campaignId };
        };
      }
    );
  };

  // Certificate Management system
  public shared ({ caller }) func createCertificate(newCertificate : Certificate) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create certificates");
    };
    if (certificates.containsKey(newCertificate.id)) {
      Runtime.trap("Certificate already exists");
    };
    certificates.add(newCertificate.id, newCertificate);
  };

  public query ({ caller }) func getCertificateById(certificateId : Text) : async ?Certificate {
    // Public query - anyone can verify certificates via QR code
    certificates.get(certificateId);
  };

  // Beneficiary Management
  public shared ({ caller }) func addBeneficiary(newBeneficiary : Beneficiary) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add beneficiaries");
    };
    if (beneficiaries.containsKey(newBeneficiary.id)) {
      Runtime.trap("Beneficiary already exists");
    };
    beneficiaries.add(newBeneficiary.id, newBeneficiary);
  };

  public shared ({ caller }) func updateBeneficiary(beneficiaryId : Text, updatedBeneficiary : Beneficiary) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update beneficiaries");
    };
    if (not beneficiaries.containsKey(beneficiaryId)) {
      Runtime.trap("Beneficiary does not exist");
    };
    beneficiaries.add(beneficiaryId, updatedBeneficiary);
  };

  public shared ({ caller }) func deleteBeneficiary(beneficiaryId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete beneficiaries");
    };
    beneficiaries.remove(beneficiaryId);
  };

  // Campaign Management
  public shared ({ caller }) func startCampaign(newCampaign : Campaign) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can start campaigns");
    };
    if (campaigns.containsKey(newCampaign.id)) {
      Runtime.trap("Campaign already exists");
    };
    campaigns.add(newCampaign.id, newCampaign);
  };

  public shared ({ caller }) func updateCampaign(campaignId : Text, updatedCampaign : Campaign) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update campaigns");
    };
    if (not campaigns.containsKey(campaignId)) {
      Runtime.trap("Campaign does not exist");
    };
    campaigns.add(campaignId, updatedCampaign);
  };

  public query ({ caller }) func getAllCampaigns() : async [Campaign] {
    // Public query - anyone can view campaigns
    campaigns.values().toArray();
  };

  public query ({ caller }) func getCampaignById(campaignId : Text) : async ?Campaign {
    // Public query - anyone can view campaign details
    campaigns.get(campaignId);
  };

  // Enquiry Management
  public shared ({ caller }) func submitEnquiry(newEnquiry : Enquiry) : async () {
    // Public enquiries allowed - guests can submit enquiries
    if (enquiries.containsKey(newEnquiry.id)) {
      Runtime.trap("Enquiry already exists");
    };
    enquiries.add(newEnquiry.id, newEnquiry);
  };

  public shared ({ caller }) func replyEnquiry(enquiryId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reply to enquiries");
    };
    let enquiry = switch (enquiries.get(enquiryId)) {
      case (null) { Runtime.trap("Enquiry does not exist") };
      case (?e) { e };
    };
    let updatedEnquiry = { enquiry with replied = true };
    enquiries.add(enquiryId, updatedEnquiry);
  };

  // Query functions
  public query ({ caller }) func getMembersByDesignation(designation : Text) : async [Member] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view members by designation");
    };
    members.values().toArray().filter(
      func(m) { m.designation == designation }
    );
  };

  public query ({ caller }) func getAllMemberReferrals(memberId : Text) : async [Referral] {
    // Members can view their own referrals, admins can view any member's referrals
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only members can view referrals");
    };
    // Additional check: non-admin users can only view their own referrals
    // This requires mapping Principal to memberId, which should be done via UserProfile
    let profile = userProfiles.get(caller);
    switch (profile) {
      case (null) {
        if (not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Profile not found");
        };
      };
      case (?p) {
        switch (p.memberId) {
          case (null) {
            if (not AccessControl.isAdmin(accessControlState, caller)) {
              Runtime.trap("Unauthorized: Member ID not found in profile");
            };
          };
          case (?id) {
            if (id != memberId and not AccessControl.isAdmin(accessControlState, caller)) {
              Runtime.trap("Unauthorized: Can only view your own referrals");
            };
          };
        };
      };
    };
    referrals.values().toArray().filter(
      func(r) { r.referrerId == memberId }
    );
  };

  public query ({ caller }) func getAllMembers() : async [Member] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all members");
    };
    members.values().toArray();
  };

  public query ({ caller }) func getMemberById(memberId : Text) : async ?Member {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view member details");
    };
    members.get(memberId);
  };

  public query ({ caller }) func getAllReferrals() : async [Referral] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all referrals");
    };
    referrals.values().toArray();
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all enquiries");
    };
    enquiries.values().toArray();
  };

  public query ({ caller }) func getAllDonations() : async [Donation] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all donations");
    };
    donations.values().toArray();
  };

  public query ({ caller }) func getDonationById(donationId : Text) : async ?Donation {
    // Public query for receipt verification
    donations.get(donationId);
  };

  public query ({ caller }) func getAllBeneficiaries() : async [Beneficiary] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all beneficiaries");
    };
    beneficiaries.values().toArray();
  };

  public query ({ caller }) func getAllCertificates() : async [Certificate] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all certificates");
    };
    certificates.values().toArray();
  };
};
