
const createAction = require('../create-action');

describe('Pulse switch action', () => {

    it('can route matching node', () => {
        const mockRouteNextNode = jest.fn();
        const action = createAction({
            args: {variable: 'somePreviouslyComputedValue'},
            route: {cases: [
                { value: 'valueThatShouldNotMatch', nextNode: 'shouldNotRouteHere' },
                { value: 'somePreviouslyComputedValue', nextNode: 'expectedNode' },
            ]}
        });

        action.executeAnd(mockRouteNextNode);

        expect(mockRouteNextNode).toHaveBeenCalledTimes(1);
        expect(mockRouteNextNode).toHaveBeenCalledWith('expectedNode');    
    });

});