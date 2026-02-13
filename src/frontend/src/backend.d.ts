import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Beneficiary {
    id: string;
    documents: {
        id: string;
        blob: ExternalBlob;
    };
    name: string;
    helpHistory: Array<string>;
    helpType: string;
    address: string;
    contactDetails: string;
}
export interface Enquiry {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: string;
    replied: boolean;
}
export interface Donation {
    id: string;
    memberId?: string;
    date: string;
    donorName: string;
    campaignId?: string;
    paymentMode: string;
    amount: bigint;
    receiptNumber: string;
    transactionId: string;
}
export interface Birthday {
    day: number;
    month: number;
    year: number;
}
export interface Campaign {
    id: string;
    status: string;
    title: string;
    goalAmount: bigint;
    endDate: string;
    description: string;
    amountRaised: bigint;
    startDate: string;
}
export interface Referral {
    referredId: string;
    referrerId: string;
    timestamp: string;
    successful: boolean;
}
export interface Member {
    id: string;
    dob: Birthday;
    status: Status;
    name: string;
    designation: string;
    joiningDate: string;
    email: string;
    referralId: string;
    address: string;
    gender: Gender;
    phone: string;
    photo: ExternalBlob;
}
export interface Certificate {
    id: string;
    issueDate: string;
    templateId: string;
    recipientName: string;
    certificateType: string;
    qrCode: string;
}
export interface UserProfile {
    memberId?: string;
    name: string;
    role: string;
}
export enum Gender {
    other = "other",
    female = "female",
    male = "male"
}
export enum Status {
    active = "active",
    blocked = "blocked",
    deactivated = "deactivated"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBeneficiary(newBeneficiary: Beneficiary): Promise<void>;
    addMemberReferral(referrerId: string, referredId: string, timestamp: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    blockMember(memberId: string): Promise<void>;
    createCertificate(newCertificate: Certificate): Promise<void>;
    createDonation(newDonation: Donation): Promise<void>;
    deactivateMember(memberId: string): Promise<void>;
    deleteBeneficiary(beneficiaryId: string): Promise<void>;
    getAllBeneficiaries(): Promise<Array<Beneficiary>>;
    getAllCampaigns(): Promise<Array<Campaign>>;
    getAllCertificates(): Promise<Array<Certificate>>;
    getAllDonations(): Promise<Array<Donation>>;
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getAllMemberReferrals(memberId: string): Promise<Array<Referral>>;
    getAllMembers(): Promise<Array<Member>>;
    getAllReferrals(): Promise<Array<Referral>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCampaignById(campaignId: string): Promise<Campaign | null>;
    getCertificateById(certificateId: string): Promise<Certificate | null>;
    getDonationById(donationId: string): Promise<Donation | null>;
    getDonationsByCampaignId(campaignId: string): Promise<Array<Donation>>;
    getMemberById(memberId: string): Promise<Member | null>;
    getMembersByDesignation(designation: string): Promise<Array<Member>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerMember(newMemberData: Member): Promise<string>;
    replyEnquiry(enquiryId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    startCampaign(newCampaign: Campaign): Promise<void>;
    submitEnquiry(newEnquiry: Enquiry): Promise<void>;
    unblockMember(memberId: string): Promise<void>;
    updateBeneficiary(beneficiaryId: string, updatedBeneficiary: Beneficiary): Promise<void>;
    updateCampaign(campaignId: string, updatedCampaign: Campaign): Promise<void>;
}
