import Map from './../../core/RxMap';


/**
 * style: 
 * 
 * 
 */
const defineType = function (id, geomType, style) {
    Map.defineType(id, geomType, style);
};

Map.register('defineType', defineType);
