
let workflow = {
    name: 'Froneri Feedback Workflow',
    remarks: 'Sends email depending on field values. After sending a mail, it will also send a confirmation mail to the sender.',
    requiresOrganizationalChart: false,
    nodes: [
        {
            id: 'startNode',
            action: 'switch',
            args: [
                {name: 'variable', type: 'computed', dataSource: 'document', dataSourceField: 'inquiry_type'}
            ],
            route: {
                cases: [
                    {value: 'Reselling Inquiry', nextNode: 'emailAction1'},
                    {value: 'Supplier Application', nextNode: 'emailAction2'},
                    {value: 'Career Opportunity', nextNode: 'emailAction3'},
                    {value: 'General Consumer Inquiry', nextNode: 'emailAction4'},
                ]
            }
        },
        {
            id: 'emailAction1',
            action: 'sendMail',
            args: [
                {
                    name: 'receipients',
                    type: 'staticArray', 
                    value: ['reselling.inquiry.processor@froneri.ph']
                }
            ],
            route: {
                nextNode: 'emailAction5'
            }
        },
        {
            id: 'emailAction2',
            action: 'sendMail',
            args: [
                {
                    name: 'receipients',
                    type: 'staticArray', 
                    value: ['supplier.application.processor@froneri.ph']
                }
            ],
            route: {
                nextNode: 'emailAction5'
            }
        },
        {
            id: 'emailAction3',
            action: 'sendMail',
            args: [
                {
                    name: 'receipients',
                    type: 'staticArray', 
                    value: [
                        'hr1@froneri.ph',
                        'hr2@froneri.ph',
                    ]
                }
            ],
            route: {
                nextNode: 'emailAction5'
            }
        },
        {
            id: 'emailAction4',
            action: 'sendMail',
            args: [
                {
                    name: 'receipients',
                    type: 'staticArray', 
                    value: ['general.inquiry.processor@froneri.ph']
                }
            ],
            route: {
                nextNode: 'emailAction5'
            }
        },
        {
            id: 'emailAction5',
            action: 'sendMail',
            args: [
                {
                    name: 'receipients',
                    type: 'computedArray', 
                    value: [
                        {type: 'computed', dataSource: 'document', dataSourceField: 'email_address'}
                    ]
                }
            ],
            route: {
                nextNode: null
            }
        },
    ]
};
