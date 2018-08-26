import * as create from './commands/google@latest/create';
import * as marker from './commands/google@latest/marker';
import * as popup from './commands/google@latest/popup';
import * as point from './commands/google@latest/point';
import * as setCenter from './commands/google@latest/setCenter';
import * as center from './observers/google@latest/center';
import * as click from './observers/google@latest/click';
import * as addData from './commands/google@latest/addData';
import * as gps from './observers/google@latest/gps';


/**
 * @private
*/
export default (registerCommand, registerObserver) => {
  registerCommand(create.name, create.default);
  registerCommand(marker.name, marker.default);
  registerCommand(popup.name, popup.default);
  registerCommand(point.name, point.default);
  registerCommand(setCenter.name, setCenter.default);
  registerCommand(addData.name, addData.default);
  registerObserver(center.name, center.default);
  registerObserver(click.name, click.default);
  registerObserver(gps.name, gps.default);
};
