import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { saveLocalStorage, loadLocalStorage } from './dzApi';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    saveLocalStorage(LOCALSTORAGE_KEY, seconds);
  }, 500)
);
player.setCurrentTime(loadLocalStorage(LOCALSTORAGE_KEY));
