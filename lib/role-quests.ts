import type { RoleMission } from "../components/RoleQuest";
export const bibleMissions: RoleMission[]=[
{id:"detective",role:"Scripture Detective",title:"Investigate Jesus' teachings",lesson:"Read Matthew 5–7 and Luke 10. Examine context and identify what the text says.",questions:[
{prompt:"Where is the Sermon on the Mount recorded?",answers:["Matthew 5–7","Genesis 1–3","Acts 1–3","Revelation 19–21"],correct:0,why:"Matthew records Jesus' teachings on the mountain across chapters 5, 6, and 7.",source:"Matthew 5–7"},
{prompt:"Who helped the wounded traveler in Jesus' parable?",answers:["A priest","A Levite","A Samaritan","A tax collector"],correct:2,why:"The Samaritan showed mercy and arranged further care.",source:"Luke 10:30–37"},
{prompt:"Jesus describes which as the greatest commandment?",answers:["Build a temple","Love God wholeheartedly","Travel to Rome","Fast every day"],correct:1,why:"Jesus teaches love for God first and love of neighbor second.",source:"Matthew 22:37–40"}]},
{id:"navigator",role:"Mission Navigator",title:"Travel through Acts",lesson:"Follow early Christian communities, service, and cooperation in Acts 2, 6, 11 and 13.",questions:[
{prompt:"Where were Jesus' disciples first called Christians?",answers:["Jerusalem","Antioch","Athens","Rome"],correct:1,why:"The disciples were first called Christians in Antioch.",source:"Acts 11:26"},
{prompt:"Why were seven people appointed in Acts 6?",answers:["To build boats","To address the daily distribution of food","To collect taxes","To build the temple"],correct:1,why:"The community responded when widows were being overlooked.",source:"Acts 6:1–6"},
{prompt:"Who was set apart with Saul for missionary work?",answers:["Barnabas","Moses","Nicodemus","Pilate"],correct:0,why:"The church in Antioch set apart Barnabas and Saul.",source:"Acts 13:1–4"}]},
{id:"restorer",role:"Restoration Guide",title:"Grace and second chances",lesson:"Study John 21, Galatians 2, and Luke 15. Consider repentance, dignity, and restoration.",questions:[
{prompt:"What did Jesus ask Peter three times after the resurrection?",answers:["Will you build a city?","Do you love me?","Where is Jerusalem?","Can you swim?"],correct:1,why:"Jesus asks Peter about love and entrusts him with care for others.",source:"John 21:15–17"},
{prompt:"In Luke 15, what does the father do when the lost son returns?",answers:["Refuses him","Runs to meet him","Sells his land","Calls guards"],correct:1,why:"The father welcomes his son with compassion.",source:"Luke 15:20–24"},
{prompt:"What does Paul emphasize in Galatians 2:16?",answers:["Justification by works of law","Justification through faith in Jesus Christ","Roman citizenship","Military strength"],correct:1,why:"Paul contrasts justification through faith with dependence on works of the law.",source:"Galatians 2:16"}]}
];
