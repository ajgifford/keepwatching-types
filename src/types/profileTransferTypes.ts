import { Account } from './accountTypes';
import { BaseResponse } from './responseTypes';

/**
 * Status of a profile transfer invitation through its lifecycle.
 *
 * @enum ProfileTransferInvitationStatus
 */
export type ProfileTransferInvitationStatus = 'pending' | 'claimed' | 'canceled' | 'expired';

/**
 * Represents an invitation to transfer a profile out of its current account
 * and into a brand-new, independent account. Doubles as the audit record for
 * the transfer (admin tooling reads this same shape).
 *
 * @interface ProfileTransferInvitation
 * @example
 * ```typescript
 * const invitation: ProfileTransferInvitation = {
 *   id: 1,
 *   profileId: 42,
 *   profileName: "Jamie's Profile",
 *   sourceAccountId: 5,
 *   sourceAccountName: "The Smith Family",
 *   targetEmail: "jamie@example.com",
 *   targetName: "Jamie",
 *   newDefaultProfileId: null,
 *   status: 'pending',
 *   expiresAt: "2026-07-19T00:00:00.000Z",
 *   claimedAt: null,
 *   createdAt: "2026-07-12T00:00:00.000Z"
 * };
 * ```
 */
export interface ProfileTransferInvitation {
  /** Unique identifier for the invitation */
  id: number;

  /** ID of the profile being transferred */
  profileId: number;

  /** Display name of the profile being transferred, at invite time */
  profileName: string;

  /** ID of the account the profile is being transferred out of */
  sourceAccountId: number;

  /** Display name of the source account, at invite time */
  sourceAccountName: string;

  /** Email address the invitation was sent to */
  targetEmail: string;

  /** Optional display name provided for the new account */
  targetName: string | null;

  /** Profile to make the source account's new default, if the transferred profile was its default */
  newDefaultProfileId: number | null;

  /** Current status of the invitation */
  status: ProfileTransferInvitationStatus;

  /** ISO timestamp after which the invitation can no longer be claimed */
  expiresAt: string;

  /** ISO timestamp the invitation was claimed, if it has been */
  claimedAt: string | null;

  /** ISO timestamp the invitation was created */
  createdAt: string;
}

/**
 * Request payload for inviting a profile to transfer into a new, independent account.
 *
 * @interface CreateProfileTransferInvitationRequest
 * @example
 * ```typescript
 * const request: CreateProfileTransferInvitationRequest = {
 *   targetEmail: "jamie@example.com",
 *   targetName: "Jamie"
 * };
 *
 * // When the profile being transferred is the account's current default,
 * // a replacement default must be provided.
 * const requestWithNewDefault: CreateProfileTransferInvitationRequest = {
 *   targetEmail: "jamie@example.com",
 *   newDefaultProfileId: 7
 * };
 * ```
 */
export interface CreateProfileTransferInvitationRequest {
  /** Email address to send the claim invitation to */
  targetEmail: string;

  /** Optional display name for the new account */
  targetName?: string;

  /** Required only when the profile being transferred is the source account's current default */
  newDefaultProfileId?: number;
}

/**
 * Public, pre-authentication preview of a pending invitation shown on the claim page.
 *
 * @interface ProfileTransferInvitationPreview
 */
export interface ProfileTransferInvitationPreview {
  /** Display name of the profile being transferred */
  profileName: string;

  /** Display name of the account the profile is being transferred from */
  sourceAccountName: string;

  /** Email address the invitation was sent to */
  targetEmail: string;

  /** Display name provided for the new account, if any, to pre-fill the claim form */
  targetName: string | null;

  /** ISO timestamp after which the invitation can no longer be claimed */
  expiresAt: string;
}

/**
 * Request payload for claiming a profile transfer invitation.
 * The new account's email/uid are derived server-side from the verified Firebase token,
 * not accepted from the request body.
 *
 * @interface ClaimProfileTransferRequest
 */
export interface ClaimProfileTransferRequest {
  /** Optional display name for the new account */
  name?: string;
}

/**
 * API response wrapper for a single profile transfer invitation.
 *
 * @interface ProfileTransferInvitationResponse
 * @extends BaseResponse
 */
export interface ProfileTransferInvitationResponse extends BaseResponse {
  /** The invitation data returned by the API */
  invitation: ProfileTransferInvitation;
}

/**
 * API response wrapper for a list of profile transfer invitations.
 *
 * @interface ProfileTransferInvitationsResponse
 * @extends BaseResponse
 */
export interface ProfileTransferInvitationsResponse extends BaseResponse {
  /** Invitations returned by the API */
  invitations: ProfileTransferInvitation[];
}

/**
 * API response wrapper for a public invitation preview.
 *
 * @interface ProfileTransferInvitationPreviewResponse
 * @extends BaseResponse
 */
export interface ProfileTransferInvitationPreviewResponse extends BaseResponse {
  /** The invitation preview data returned by the API */
  preview: ProfileTransferInvitationPreview;
}

/**
 * API response wrapper for a successfully claimed profile transfer.
 * Returns the newly created account so the client can bootstrap the session.
 *
 * @interface ClaimProfileTransferResponse
 * @extends BaseResponse
 */
export interface ClaimProfileTransferResponse extends BaseResponse {
  /** The newly created account that now owns the transferred profile */
  account: Account;
}
