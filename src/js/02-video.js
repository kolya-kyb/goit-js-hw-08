import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const saveLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadLocalStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return JSON.parse(serializedState) || 0;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    saveLocalStorage('videoplayer-current-time', seconds);
  }, 500)
);
player.setCurrentTime(loadLocalStorage('videoplayer-current-time'));
