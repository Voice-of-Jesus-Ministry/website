import test from "node:test";
import assert from "node:assert/strict";
import { evaluateVotes } from "../lib/governance.ts";

test("Uncontested: 1 AI agent approval passes if nobody else rejects", () => {
  const result = evaluateVotes([{ voter: "Guardian", decision: "approve" }]);
  assert.equal(result.passed, true);
  assert.equal(result.uncontested, true);
  assert.equal(result.approveScore, 1);
});

test("Uncontested: 1 User approval passes with 0 rejections", () => {
  const result = evaluateVotes([{ voter: "user", decision: "approve" }]);
  assert.equal(result.passed, true);
  assert.equal(result.uncontested, true);
  assert.equal(result.approveScore, 4);
});

test("Owner override: User approve (4) beats all 3 agents rejecting (3)", () => {
  const result = evaluateVotes([
    { voter: "user", decision: "approve" },
    { voter: "Guardian", decision: "reject" },
    { voter: "Electra", decision: "reject" },
    { voter: "Ella", decision: "reject" },
  ]);
  assert.equal(result.passed, true);
  assert.equal(result.approveScore, 4);
  assert.equal(result.rejectScore, 3);
});

test("Owner veto: User reject (4) blocks all 3 agents approving (3)", () => {
  const result = evaluateVotes([
    { voter: "user", decision: "reject" },
    { voter: "Guardian", decision: "approve" },
    { voter: "Electra", decision: "approve" },
    { voter: "Ella", decision: "approve" },
  ]);
  assert.equal(result.passed, false);
  assert.equal(result.approveScore, 3);
  assert.equal(result.rejectScore, 4);
});

test("Contested between agents: 2 approvals (2) beat 1 rejection (1) when user does not vote", () => {
  const result = evaluateVotes([
    { voter: "Guardian", decision: "approve" },
    { voter: "Electra", decision: "approve" },
    { voter: "Ella", decision: "reject" },
  ]);
  assert.equal(result.passed, true);
  assert.equal(result.approveScore, 2);
  assert.equal(result.rejectScore, 1);
});

test("Contested between agents: 1 approval (1) vs 1 rejection (1) does not pass (tie)", () => {
  const result = evaluateVotes([
    { voter: "Guardian", decision: "approve" },
    { voter: "Ella", decision: "reject" },
  ]);
  assert.equal(result.passed, false);
  assert.equal(result.approveScore, 1);
  assert.equal(result.rejectScore, 1);
});
