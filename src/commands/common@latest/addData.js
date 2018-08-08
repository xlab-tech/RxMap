
import Map from './../../core/RxMap';

const addData = function (typeId, data) {
    const type = this.getRxMap().getDataType(typeId);
    if (!type) {
        throw (`Not type ${typeId} register`);
    }
    switch (type.geomType) {
        case 'point':
            return data.map(element => this.renderPoint([element.position.lat, element.position.lng], type.style, element).value().value);
        case 'marker':
            return data.map(element => this.renderMarker([element.position.lat, element.position.lng], type.style, element).value().value);
    }
};

Map.register('addData', addData);
