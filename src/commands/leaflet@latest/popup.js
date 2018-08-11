
import { registerCommand } from '../../core/registerCommand';

const addPopup = (marker, content) => {
  const { properties } = marker;
  let contentString = content;
  if (typeof content === 'function') {
    contentString = content(properties);
  }
  marker.bindPopup(contentString);
};

const popup = (context, content) => {
  const { value, name } = context.lastExecution;
  if (name === 'marker') {
    addPopup(value, content);
  } else if (name === 'addData') {
    value.forEach(marker => addPopup(marker, content));
  }
  return context.lastExecution;
};

registerCommand('popup', popup);

export default popup;
