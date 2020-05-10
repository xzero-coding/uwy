import { Command, CommandContext } from './command';
import { getMemberFromMention } from '../utils/command-utils';
import config from '../config.json';

export default class XPCommand implements Command {
    name = 'xp';
    summary = 'Display the XP card of a user.';
    cooldown = 3;
    module = 'XP';

    execute = (ctx: CommandContext, userMention: string) => {        
        const target = (userMention) ?
            getMemberFromMention(userMention, ctx.guild) : ctx.member;
        
        if (target.user.bot)
            throw new TypeError(`Bot users cannot earn XP`);
            
        const xpCardURL = `${config.api.url}/guilds/${ctx.guild.id}/members/${target.id}/xp-card`;
        return ctx.channel.send({
            files: [{
                attachment: xpCardURL,
                name: 'xp-card.png'
            }]
        });
    };
}
