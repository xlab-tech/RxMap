
import { registerCommand } from '../../../../src/index';

const test = (context, text) => {
    alert(text);
};

registerCommand('test', test);

export default test;
