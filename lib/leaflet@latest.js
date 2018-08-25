import * as create from './commands/leaflet@latest/create';
import * as marker from './commands/leaflet@latest/marker';
import * as popup from './commands/leaflet@latest/popup';
import * as point from './commands/leaflet@latest/point';
import * as setCenter from './commands/leaflet@latest/setCenter';
import * as center from './observers/leaflet@latest/center';
import * as click from './observers/leaflet@latest/click';
import * as addData from './commands/leaflet@latest/addData';
import * as gps from './observers/leaflet@latest/gps';

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
