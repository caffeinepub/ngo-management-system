import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Member, Donation, Certificate, Beneficiary, Campaign, Enquiry, UserProfile } from '../backend';

export function useGetAllMembers() {
  const { actor, isFetching } = useActor();

  return useQuery<Member[]>({
    queryKey: ['members'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMemberById(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Member | null>({
    queryKey: ['member', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMemberById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useRegisterMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (member: Member) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerMember(member);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}

export function useBlockMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.blockMember(memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['member'] });
    },
  });
}

export function useUnblockMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.unblockMember(memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['member'] });
    },
  });
}

export function useDeactivateMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deactivateMember(memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['member'] });
    },
  });
}

export function useGetAllDonations() {
  const { actor, isFetching } = useActor();

  return useQuery<Donation[]>({
    queryKey: ['donations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDonations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDonationById(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Donation | null>({
    queryKey: ['donation', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDonationById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateDonation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (donation: Donation) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createDonation(donation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}

export function useGetAllCertificates() {
  const { actor, isFetching } = useActor();

  return useQuery<Certificate[]>({
    queryKey: ['certificates'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCertificates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCertificateById(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Certificate | null>({
    queryKey: ['certificate', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCertificateById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateCertificate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (certificate: Certificate) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createCertificate(certificate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
    },
  });
}

export function useGetAllBeneficiaries() {
  const { actor, isFetching } = useActor();

  return useQuery<Beneficiary[]>({
    queryKey: ['beneficiaries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBeneficiaries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBeneficiary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (beneficiary: Beneficiary) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addBeneficiary(beneficiary);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
    },
  });
}

export function useUpdateBeneficiary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, beneficiary }: { id: string; beneficiary: Beneficiary }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBeneficiary(id, beneficiary);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
    },
  });
}

export function useDeleteBeneficiary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteBeneficiary(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
    },
  });
}

export function useGetAllCampaigns() {
  const { actor, isFetching } = useActor();

  return useQuery<Campaign[]>({
    queryKey: ['campaigns'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCampaigns();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCampaignById(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Campaign | null>({
    queryKey: ['campaign', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCampaignById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useStartCampaign() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaign: Campaign) => {
      if (!actor) throw new Error('Actor not available');
      return actor.startCampaign(campaign);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}

export function useUpdateCampaign() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, campaign }: { id: string; campaign: Campaign }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateCampaign(id, campaign);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaign'] });
    },
  });
}

export function useGetDonationsByCampaign(campaignId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Donation[]>({
    queryKey: ['campaignDonations', campaignId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDonationsByCampaignId(campaignId);
    },
    enabled: !!actor && !isFetching && !!campaignId,
  });
}

export function useGetAllEnquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<Enquiry[]>({
    queryKey: ['enquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitEnquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enquiry: Enquiry) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitEnquiry(enquiry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}

export function useReplyEnquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enquiryId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.replyEnquiry(enquiryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
