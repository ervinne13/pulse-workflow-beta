
let workflow = {
    name: 'Leave Request Workflow',
    remarks: 'Workflow that goes through supervisor 1 (if existing), Head, ',
    requiresOrganizationalChart: true,
    states: [
        
    ],
    sequenceTemplate: [
        {
            state: null,
            actionSets: [

            ],
            events: [
                {
                    action: 'Submit / Save', 
                    toState: 'Draft',
                    conditions: [
                        [{source: 'documentOwner', condition: '=', value: 'actor'}]
                    ]
                },
                {
                    action: 'Send for Approval', 
                    toState: 'Awaiting Supervisor Approval', 
                    conditions: [
                        [{source: 'documentOwner', condition: '=', value: 'actor'}]
                    ]
                },
                {
                    action: 'Archive', 
                    toState: 'Archived',
                    conditions: [
                        [{source: 'documentOwner', condition: '=', value: 'actor'}]
                    ]
                }
            ],
            conditions: null,
        },
        {
            state: 'Draft',
            events: [
                {action: 'Send for Approval', toState: 'Awaiting Supervisor Approval', actor: 'documentOwner', actorSource: 'var'},
                {action: 'Archive', toState: 'Archived', actor: 'documentOwner', actorSource: 'var'}
            ],
            conditions: null,
        },
        {
            state: 'Awaiting Supervisor Approval', 
            events: [
                {action: 'Approve', toState: 'Awaiting Head Approval', actor: 'positionLevel:Supervisor', actorSource: 'orgChart'},
                {action: 'Reject', toState: 'Rejected', actor: 'positionLevel:Supervisor', actorSource: 'orgChart'},
                {action: 'Cancel', toState: 'Draft', actor: 'documentOwner', actorSource: 'var'}
            ],
            conditions: null,
        },
        {
            state: 'Awaiting Head Approval',
            events: [
                {action: 'Approve', toState: 'Awaiting HR Approval', actor: 'positionLevel:Head', actorSource: 'orgChart'},
                {action: 'Reject', toState: 'Rejected', actor: 'positionLevel:Head', actorSource: 'orgChart'},
                {action: 'Cancel', toState: 'Draft', actor: 'documentOwner', actorSource: 'var'}
            ],
            conditions: null,
        },
        {
            state: 'Awaiting HR Approval',
            events: [
                {action: 'Approve', toState: 'Approved', actor: 'role:Leave Processor', actorSource: 'orgChart'},
                {action: 'Reject', toState: 'Rejected', actor: 'role:Leave Processor', actorSource: 'orgChart'},
                {action: 'Cancel', toState: 'Draft', actor: 'documentOwner', actorSource: 'var'}
            ],
            conditions: null,
        },
        {
            state: 'Approved',
            events: [
                {action: 'Cancel', toState: 'Draft', actor: 'documentOwner', actorSource: 'var'}
            ],
            conditions: null,
        },
        {
            state: 'Rejected',
            events: [
                {action: 'Archive', toState: 'Archived', actor: 'documentOwner', actorSource: 'var'},
                {action: 'Re-send', toState: 'Awaiting Supervisor Approval', actor: 'documentOwner', actorSource: 'var'},
            ],
            conditions: null,
        },
        {
            state: 'Archived',
            events: [],
            conditions: null,
        },
    ]
};
