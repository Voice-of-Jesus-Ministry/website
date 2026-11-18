"use client";
import { useState } from "react";
import styles from "./prayer.module.css";
const communityUrl = "https://m.me/cm/AbYwya7_jv6a4Y_v/?send_source=cm%3Acopy_invite_link";
export function PrayerRequest() {
  const [name,setName] = useState("");
  const [message,setMessage] = useState("");
  const [status,setStatus] = useState("");
  const copy = async () => {
    if (!message.trim()) { setStatus("Please enter a prayer request first."); return; }
    const text = `Prayer request from ${name.trim() || "Anonymous"}:\n\n${message.trim()}`;
    try { await navigator.clipboard.writeText(text); setStatus("Copied. Open Messenger and paste your request to send it."); }
    catch { setStatus("Copy is unavailable in this browser. Select and copy your request above, then open Messenger."); }
  };
  return <div className={styles.form}>
    <label htmlFor="prayer-name">Name <span>(optional)</span></label>
    <input id="prayer-name" value={name} onChange={e=>setName(e.target.value)} maxLength={90} autoComplete="name" placeholder="Your name or Anonymous" />
    <label htmlFor="prayer-message">Your prayer request</label>
    <textarea id="prayer-message" value={message} onChange={e=>setMessage(e.target.value)} maxLength={2000} rows={5} placeholder="How can we pray with you?" />
    <p className={styles.privacy}>Please do not include private medical, financial, or identifying information. Messenger messages are subject to Meta’s privacy practices. This is not an emergency service.</p>
    <div className={styles.formActions}>
      <button type="button" onClick={copy}>Copy prayer request</button>
      <a href={communityUrl} target="_blank" rel="noopener noreferrer">Open community Messenger ↗</a>
    </div>
    <p className={styles.status} role="status">{status}</p>
  </div>;
}
