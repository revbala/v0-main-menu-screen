import type { DialogLine } from "./dialog-box";

export interface Quest {
  id: string;
  title: string;
  description: string;
  objective: string;
  giver: string;
  /** Steps remaining, e.g. "0/3" */
  progress: number;
  total: number;
  completed: boolean;
  reward: string;
}

export const FACTORY_QUESTS: Quest[] = [
  {
    id: "broken-valve",
    title: "The Broken Valve",
    description:
      "Foreman Griggs needs a replacement pressure valve before Boiler 7 explodes. Find one at Mercer's Tool Shop outside.",
    objective: "Find a pressure valve at Mercer's Tool Shop",
    giver: "Foreman Griggs",
    progress: 0,
    total: 1,
    completed: false,
    reward: "5 Coal, 10 Scrip",
  },
  {
    id: "missing-workers",
    title: "Missing Shift",
    description:
      "Three workers didn't show up for the night shift. Foreman Griggs wants you to check on them. Ask around the district.",
    objective: "Ask NPCs about the missing workers",
    giver: "Foreman Griggs",
    progress: 0,
    total: 3,
    completed: false,
    reward: "Blueprint Fragment, 15 Scrip",
  },
  {
    id: "coal-delivery",
    title: "Coal Run",
    description:
      "Old Berta at the Coal Depot needs help moving crates to the factory furnace room. Deliver 3 coal crates.",
    objective: "Deliver coal crates to the furnace room",
    giver: "Old Berta",
    progress: 0,
    total: 3,
    completed: false,
    reward: "Health Tonic, 8 Scrip",
  },
];

// NPC dialog trees keyed by NPC id
export const NPC_DIALOGS: Record<string, DialogLine[]> = {
  "foreman-griggs": [
    {
      speaker: "FOREMAN GRIGGS",
      text: "Elias! Thank the gears you're here. We've got problems piling up faster than coal dust.",
    },
    {
      speaker: "FOREMAN GRIGGS",
      text: "Boiler 7's pressure valve cracked this morning. If we don't replace it, the whole thing blows. And three workers from the night shift? Gone. Vanished.",
      choices: [
        { label: "I'll find the valve. Where do I look?", nextLineIndex: 2 },
        { label: "Missing workers? Tell me more.", nextLineIndex: 4 },
        { label: "I'll help with both.", action: "accept-both-quests" },
      ],
    },
    {
      speaker: "FOREMAN GRIGGS",
      text: "Try Mercer's Tool Shop down the street. Old Mercer hoards parts like a dragon hoards gold. Tell him I sent you.",
      choices: [
        { label: "Got it. I'll head there now.", action: "accept-valve-quest" },
      ],
    },
    {
      speaker: "ELIAS",
      text: "I'll find that valve, Foreman.",
    },
    {
      speaker: "FOREMAN GRIGGS",
      text: "Jenkins, Molly, and Osgood. Good workers, all of them. Never missed a shift before. Ask around -- someone must have seen them last night.",
      choices: [
        { label: "I'll look into it.", action: "accept-missing-quest" },
      ],
    },
  ],
  "old-berta": [
    {
      speaker: "OLD BERTA",
      text: "Bless you, child. These old bones can't haul coal like they used to. Three crates need to get to the furnace room inside.",
      choices: [
        { label: "I'll carry them for you.", action: "accept-coal-quest" },
        { label: "Maybe later, Berta.", nextLineIndex: 2 },
      ],
    },
    {
      speaker: "OLD BERTA",
      text: "You're a good lad. The crates are marked -- just grab them and haul them through the factory gate.",
    },
    {
      speaker: "OLD BERTA",
      text: "Alright then. You know where to find me. These crates won't move themselves though...",
    },
  ],
  "mercer": [
    {
      speaker: "MERCER",
      text: "...A pressure valve? Hmm. Might have one. Might not. Depends on what you're offering.",
      choices: [
        { label: "Foreman Griggs sent me.", nextLineIndex: 1 },
        { label: "I can pay in scrip.", nextLineIndex: 2 },
      ],
    },
    {
      speaker: "MERCER",
      text: "Griggs, eh? That old rust bucket still owes me for the last shipment. Fine -- take the valve. But tell him we're square after this.",
      choices: [
        { label: "Thanks, Mercer.", action: "got-valve" },
      ],
    },
    {
      speaker: "MERCER",
      text: "Scrip's scrip. Here, take it. Careful now -- that's precision ironwork, not some tin toy.",
      choices: [
        { label: "I'll be careful.", action: "got-valve" },
      ],
    },
  ],
  "worker-jenkins-wife": [
    {
      speaker: "MAGGIE",
      text: "Jenkins? He left for the factory at his usual time. Kissed me goodbye and everything... He never came home?",
    },
    {
      speaker: "MAGGIE",
      text: "Oh no... He mentioned something about strange sounds from the lower levels. Said the foreman told them to ignore it. Please, find him!",
      choices: [
        { label: "I will, I promise.", action: "clue-found" },
      ],
    },
  ],
  "worker-thomas": [
    {
      speaker: "THOMAS",
      text: "*cough* Another day, another pound of soot in the lungs. What do you want?",
      choices: [
        { label: "Seen anything odd lately?", nextLineIndex: 1 },
        { label: "Never mind.", nextLineIndex: 2 },
      ],
    },
    {
      speaker: "THOMAS",
      text: "Odd? Everything's odd in this place. But now you mention it... I heard banging from beneath the boiler room last night. Like someone hammering on pipes. Gave me the shivers.",
      choices: [
        { label: "Thanks, Thomas.", action: "clue-found" },
      ],
    },
    {
      speaker: "THOMAS",
      text: "Suit yourself. More coal to shovel.",
    },
  ],
  "worker-mabel": [
    {
      speaker: "MABEL",
      text: "Keep your head down and your hands moving. That's what I always say.",
    },
    {
      speaker: "MABEL",
      text: "Don't get involved in things that don't concern you, Elias. This factory has... secrets. Best left buried.",
    },
  ],
  "street-vendor": [
    {
      speaker: "STREET VENDOR",
      text: "Hot pies! Get your hot pies! ...Oh, it's you, Elias. Business is slow today. Everyone's spooked about something.",
    },
    {
      speaker: "STREET VENDOR",
      text: "I saw some men in long coats near the factory gate last night. Official-looking types. They didn't buy any pies though. Rude.",
      choices: [
        { label: "Long coats? Who were they?", nextLineIndex: 2 },
        { label: "Thanks for the info.", action: "clue-found" },
      ],
    },
    {
      speaker: "STREET VENDOR",
      text: "Couldn't say. But they had that look about them, y'know? The kind that says 'we own this place and everyone in it.'",
    },
  ],
  "lamplighter": [
    {
      speaker: "SILAS THE LAMPLIGHTER",
      text: "Evening, Elias. I light the lamps, and the lamps light the dark. Simple work for a simple man.",
    },
    {
      speaker: "SILAS THE LAMPLIGHTER",
      text: "Though I'll tell you this -- the gaslight on Factory Row flickered out three times last night. Never done that before. Something underground is drawing power.",
    },
  ],
};
