/**
 * Multi-Agent Governance Voting Calculator
 * Implements owner-override and single-approval fast path logic.
 */

export interface Vote {
  voter: "user" | "Guardian" | "Electra" | "Ella" | string;
  decision: "approve" | "reject";
}

export interface GovernanceConfig {
  weights: Record<string, number>;
  minApprovalsZeroRejects: number;
  contestedApprovalScoreRequired: number;
}

export const DEFAULT_GOVERNANCE: GovernanceConfig = {
  weights: {
    user: 4,
    Guardian: 1,
    Electra: 1,
    Ella: 1,
  },
  minApprovalsZeroRejects: 1,
  contestedApprovalScoreRequired: 2,
};

export interface TallyResult {
  passed: boolean;
  reason: string;
  approveScore: number;
  rejectScore: number;
  uncontested: boolean;
}

export function evaluateVotes(
  votes: Vote[],
  config: GovernanceConfig = DEFAULT_GOVERNANCE
): TallyResult {
  let approveScore = 0;
  let rejectScore = 0;
  let approveCount = 0;
  let rejectCount = 0;

  for (const vote of votes) {
    const weight = config.weights[vote.voter] ?? 1;
    if (vote.decision === "approve") {
      approveScore += weight;
      approveCount += 1;
    } else if (vote.decision === "reject") {
      rejectScore += weight;
      rejectCount += 1;
    }
  }

  // 1. Fast path: At least 1 approval (User or Agent) and NO rejections
  if (rejectCount === 0) {
    if (approveCount >= config.minApprovalsZeroRejects) {
      return {
        passed: true,
        reason: `Uncontested pass: ${approveCount} approval(s) (score: ${approveScore}) with 0 rejections.`,
        approveScore,
        rejectScore: 0,
        uncontested: true,
      };
    }
    return {
      passed: false,
      reason: "No votes cast or zero approvals.",
      approveScore: 0,
      rejectScore: 0,
      uncontested: true,
    };
  }

  // 2. Contested path: Rejection was cast
  const passed =
    approveScore > rejectScore &&
    approveScore >= config.contestedApprovalScoreRequired;

  const reason = passed
    ? `Contested vote PASSED: Approve score (${approveScore}) exceeded Reject score (${rejectScore}).`
    : `Contested vote REJECTED: Reject score (${rejectScore}) >= Approve score (${approveScore}) or threshold not met.`;

  return {
    passed,
    reason,
    approveScore,
    rejectScore,
    uncontested: false,
  };
}
