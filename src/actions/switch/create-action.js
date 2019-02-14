
const canSwitch = state => ({
    executeAnd: next => {
        let cases = state.route.cases;
        let variable = state.args.variable;

        for (let c of cases) {
            if (c.value == variable) {
                next(c.nextNode);
                break;
            }
        }
    }
});

const createAction = state => {
    return { ...state, ...canSwitch(state) };
};

module.exports = createAction;