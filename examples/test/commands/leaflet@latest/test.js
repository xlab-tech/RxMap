
import { registerCommand } from '../../../../index';

const test = (context, text) => {
    alert(text);
};

registerCommand('test', test);

export default test;
