import { Post, Bot } from '@skyware/bot';
const bot = new Bot();
import 'dotenv/config';

const userHandle = process.env.HANDLE!;
const password = process.env.APPPASSWORD!;

async function login() {
    console.log(`Attempting to log in as ${userHandle}`)
    await bot.login({
        identifier: userHandle,
        password: password,
    });
}

login();

bot.on('mention', handleCommands);
bot.on('reply', handleCommands);

console.log(
  `Logged in as ${userHandle}`
);

async function handleCommands(post: Post) {
  console.log(`${post.author.handle} sent a command`);
  let construction = [post.author.handle]; // buffet
  let attachment:string;

  // because this is totally the best way to do this
  const boop = post.text.includes('boop');
  const bonk = post.text.includes('bonk');
  const mentioned = post.text.match(/@([a-zA-Z0-9_.-]+)/);
  const mentionedUser = mentioned ? mentioned[1] : null;

  if (boop) {
    construction.push('booped');
    attachment = 'https://media1.tenor.com/m/1Ssp5wMkhfkAAAAC/boop-cat-boop.gif';
  } else if (bonk) {
    construction.push('bonked');
    attachment = 'https://media1.tenor.com/m/udpvUVcjpZAAAAAC/bonk.gif';
  } else {
    return;
  }

  construction.push(String(mentionedUser));
  const message = construction.join(' ');

  await post.reply({
    text: message,
    images: [
     {
      data: attachment,
      alt: message
     }
    ]
  });
}