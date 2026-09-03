import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../homepage-redesign.js',import.meta.url),'utf8');
const styles=fs.readFileSync(new URL('../homepage-redesign.css',import.meta.url),'utf8');
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
assert.match(source,/recentOnline\.find\(function\(event\)\{return embedHref/,'the most recent playable online event must keep the player available between shows');
assert.match(source,/stage\.classList\.toggle\('mp-broadcast--player',hasPlayer\)/,'the broadcast stage must enter persistent player layout whenever an embed is available');
assert.match(source,/if\(hasPlayer\)\{[\s\S]*var persistentViewer=streamViewer\(\);shell\.appendChild\(persistentViewer\)/,'the persistent player must render before its information section');
assert.match(source,/mp-broadcast-copy mp-broadcast-player-copy/,'player information must use a dedicated below-player layout');
assert.match(source,/'The Mana Pocket Live'/,'the offline player must use a stable title instead of an expired event name');
assert.match(source,/OFFLINE_STREAM_IMAGE=CONFIG\.offlineStreamImage\|\|assetBase\+'assets\/mana-pocket-offline\.png'/,'the offline poster must be served alongside the pinned homepage script');
assert.match(source,/new Twitch\.Player\(host\.id,\{width:'100%',height:'100%',channel:channel/,'Twitch channels must use the player SDK so live state can be detected');
assert.match(source,/Twitch\.Player\.OFFLINE/,'the Twitch player must switch to the custom poster when the channel is offline');
assert.match(source,/Twitch\.Player\.ONLINE/,'the Twitch player must reveal the live stream when the channel comes online');
assert.match(source,/mp-stream-offline-still/,'the persistent Twitch player must include the custom high-resolution offline still');
assert.match(styles,/\.mp-stream-offline-still \{[^}]*object-fit: cover;/,'the offline still must fill the widescreen player without distortion');
assert.match(styles,/\.mp-live-viewer--twitch\.is-online \.mp-twitch-player-host \{ opacity: 1; pointer-events: auto; \}/,'the Twitch player must only become interactive when online');
assert.match(styles,/\.mp-broadcast--player \.mp-live-viewer--landscape \{ aspect-ratio: 16 \/ 9; min-height: 0;/,'mobile landscape video must keep its natural widescreen proportions');
assert.match(styles,/\.mp-broadcast-player-copy \.mp-actions \{ display: grid;[\s\S]*grid-template-columns: 1fr 1fr;/,'mobile player actions must share one compact row');

console.log('Homepage YouTube and Twitch embed checks passed');
