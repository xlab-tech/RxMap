
import CommandBus from './core/CommandBus';
import importMapLibrary from './core/importMapLibrary';

let _Map;

/**
 * Clase que permite interactiar con los mapas a partir de comandos y observadores
 *
 * @extends {CommandBus}
 */
export class RxMap extends CommandBus {
  constructor() {
    super();
    /** @private  */
    this.createAsync = false;
    this._dataTypes = {};
    this.setSource(this);
    this.libName = null;
    this.libVersion = null;
  }

  /**
   *
   * Funcion que establece el mapa nativo inicializado
   * que se va a utilizar se llama desde el comando 'create'
   *
   * @param {Object} map
   * @memberof RxMap
   */
  setMap(map) {
    this._sourceMap = map;
  }

  /**
   * Debuelve la instancia del mapa nativo que se esta utilizando
   *
   * @returns {object}
   * @memberof RxMap
   */
  getMap() {
    return this._sourceMap;
  }

  /**
    * @typedef {Object} Command
    * @property {String} key nombre del comando.
    * @property {string} [lib] libreria del comando.
    * @property {string} [path] Ruta de la libreria.
    * @private
  */

  /**
   * @typedef {Object} loadOptions
   * @property {Array<String|Command>} [commands] Comandos a utilizar. Si se la pasa un string se da pr supuesto que son de la libreria rxmap.
   * @property {Array<String|Command>} [observers] Observadores a utilizar. Si se la pasa un string se da pr supuesto que son de la libreria rxmap.
   * @property {String} [version=latest] Version de la libreria, actualmente solo soporta latest
   * @property {String} [key] Clave de la libreria de mapas que se utiliza, para las librerias que necesiten key
   * @property {Boolean} [defer=true] Permite cargar todos los comandos al incializar si el valor es false.
   *                                En lugar de ir cargandolos segun se necesitan, por defecto true
   * @private
   *
  */

  /**
   * Metodo asyncrono que permite cargar la libreria de mapas que se le pasa por
   * parametros
   *
   * @param {String} lib Nombre de la libreria de mapas
   * @param {loadOptions} [options={}]
   *
   * @returns {Promise}
   * @memberof RxMap
   */
  async load(lib, options = {}) {
    this.libName = lib;
    this.libVersion = options.version || 'latest';
    // First Load Map Lib
    this._nativeLibrary = await importMapLibrary(lib, options);
    return this;
  }

  /**
   *  Devuelve la libreria nativa que se esta utilizando
   *
   * @returns {Object}
   * @memberof RxMap
   */
  getMapLibrary() {
    if (this._nativeLibrary) {
      return this._nativeLibrary;
    }
    if (window.L) {
      return window.L;
    }
    if (window.google && window.google.maps) {
      return window.google;
    }
    return null;
  }

  /**
   *  Crear un nuevo objeto RxMap
   *
   * @returns RxMap
   * @memberof RxMap
   */
  init() {
    return new RxMap();
  }

  /**
  * @typedef {Object} Style
  * @property {String} [icon] url del icono.
  * @property {object} [size] tamaño del icono con {width:0,height:0}
  * @property {string} [color] Color del contorno
  * @property {string} [fillColor] Color del relleno
  * @property {number} [opacity] opacidad del contorno
  * @property {number} [fillOpacity] opacidad del contorno
  * @property {number} [weight] ancho de la linea
  * @property {number} [radius] Radio del elemento
  * @private
*/

  /**
   * Funcion que añade un estilo para dibujar posteriormenrte los diferentes
   * objetos que se inserten
   *
   * @param {string} id Id unico del tipo de dato
   * @param {string} geomType tipos de geometría valores posibles (marker / point)
   * @param {Style} style estilo del tipo de dato a pintar.
   * @memberof RxMap
   */
  setDataType(id, geomType, style) {
    this._dataTypes[id] = { geomType, style };
  }

  /**
   * Recupera un tipo de dato
   *
   * @param {String} id Nombre del tipo de dato a recuperar
   * @returns {Object{geomType:string,style:Style}}
   * @memberof RxMap
   */
  getDataType(id) {
    return this._dataTypes[id];
  }
}

const createMap = () => {
  if (!_Map) {
    _Map = new RxMap();
  }
  return _Map;
};

/**
 * Instancia de RxMap
 */
export default createMap();
