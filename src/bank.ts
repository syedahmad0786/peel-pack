export const advice = [
  "Reply tomorrow. Today is a museum.",
  "Buy the snack. The bones voted.",
  "Stand up. The chair has had enough of you.",
  "Text them the normal amount. Then stop.",
  "Your tab hoard is a personality. Accept it.",
  "Do not start a podcast in this lighting.",
  "Put the phone in another room like it owes you money.",
  "Wear the loud shirt. Be the event.",
  "The dishes are not thinking about you.",
  "Go outside for seven minutes. Come back legendary.",
  "Drink water as if you are a houseplant with opinions.",
  "You do not need a new app. You need a nap.",
  "Leave the group chat on read with honor.",
  "The email can live without you for one hour.",
  "Dance badly in the kitchen. Quality control is closed.",
  "Forgive the past you who bought this domain.",
  "Touch grass. If none available, touch a plant you have not killed.",
  "Make the bed so the day has a completed quest.",
  "Your crush is also tired. Be normal.",
  "Delete 12 screenshots. Become lighter.",
  "Say no like it is a limited drop.",
  "The algorithm is not your dad.",
  "Cook something with two ingredients and swagger.",
  "Take the long way home on purpose.",
  "Compliment a stranger's shoes and flee.",
  "Close the 41st tab. It was a trap.",
  "You are allowed to be mid and beloved.",
  "Put on socks. Momentum will follow.",
  "The project can be ugly until Thursday.",
  "Call your person. Be the notification.",
];

export const coupons = [
  "ONE (1) free dramatic sigh",
  "Good for 12 minutes of doing nothing",
  "Redeem for a tiny win",
  "50% off guilt, today only",
  "Admit one raccoon to the kitchen",
  "Skip one optional obligation",
  "Free retry on a conversation",
  "Coupon for going to bed",
];

export function dailyIndex(): number {
  const d = new Date();
  return (d.getFullYear() * 1000 + d.getMonth() * 40 + d.getDate()) % advice.length;
}
