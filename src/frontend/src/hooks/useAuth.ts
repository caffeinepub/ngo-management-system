import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserProfile } from '../backend';

export function useAuth() {
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const profileQuery = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const roleQuery = useQuery<string>({
    queryKey: ['currentUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const role = await actor.getCallerUserRole();
      return role;
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const isAdminQuery = useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  return {
    isAuthenticated,
    identity,
    userProfile: profileQuery.data,
    userRole: roleQuery.data,
    isAdmin: isAdminQuery.data ?? false,
    isLoading: actorFetching || profileQuery.isLoading || roleQuery.isLoading,
    isFetched: !!actor && profileQuery.isFetched && roleQuery.isFetched,
  };
}
