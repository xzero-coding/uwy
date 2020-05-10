import { Command, CommandContext } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';

export default class SkipCommand implements Command {
    name = 'skip';
    summary = 'Skip current playing track';
    cooldown = 5;
    module = 'Music';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = async(ctx: CommandContext) => {
        const player = this.music.joinAndGetPlayer(ctx);
        if (player.queue.size <= 1)
            throw new TypeError('No tracks to skip');
        player.stop();
    }
}
