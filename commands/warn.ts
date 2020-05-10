import { Command, CommandContext } from './command';
import AutoMod from '../modules/auto-mod/auto-mod';
import Deps from '../utils/deps';
import { getMemberFromMention } from '../utils/command-utils';

export default class WarnCommand implements Command {
    name = 'warn';
    summary = 'Warn a user and add a warning to their account.';
    cooldown = 5;
    module = 'Auto-mod';
    
    constructor(private autoMod = Deps.get<AutoMod>(AutoMod)) {}
    
    execute = async(ctx: CommandContext, targetMention: string, ...args: string[]) => {
        const reason = args.join(' ');
        const target = (targetMention) ?
            getMemberFromMention(targetMention, ctx.guild) : ctx.member;
        
        await this.autoMod.warnMember(target, ctx.user, reason);

        await ctx.channel.send(`<@!${target}> was warned for \`${reason}\``);
    };
}
