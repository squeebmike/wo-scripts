import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../homepage-redesign.js',import.meta.url),'utf8');
const start=source.indexOf('function twitchParent(');
const end=source.indexOf('\nfunction videoOrientation(',start);
assert.ok(start>=0&&end>start,'video embed helpers must exist');
const context={window:{location:{hostname:'themanapocket.com'}},URL,encodeURIComponent};
vm.runInNewContext(source.slice(start,end)+';this.embedHref=embedHref;',context);

assert.equal(context.embedHref('https://www.youtube.com/watch?v=abcdefghijk'),'https://www.youtube.com/embed/abcdefghijk?autoplay=1&mute=1&playsinline=1');
assert.equal(context.embedHref('https://www.twitch.tv/manapocket'),'https://player.twitch.tv/?channel=manapocket&parent=themanapocket.com&autoplay=true&muted=true');
assert.equal(context.embedHref('https://www.twitch.tv/videos/123456'),'https://player.twitch.tv/?video=v123456&parent=themanapocket.com&autoplay=true&muted=true');
assert.equal(context.embedHref('https://clips.twitch.tv/FancyClip'),'https://clips.twitch.tv/embed?clip=FancyClip&parent=themanapocket.com&autoplay=true&muted=true');
assert.match(context.embedHref('https://player.twitch.tv/?channel=manapocket'),/parent=themanapocket\.com/);
assert.match(source,/embedHref\(active\.embedUrl\|\|active\.embed\)/,'CMS embed fields must be normalized, not trusted as iframe-ready URLs');

console.log('Homepage YouTube and Twitch embed checks passed');
