const FuzzedDataProvider = require('@jazzer.js/core');

function random(data){
    return data;
}

function runTicket(data){
    //return data;
    const provider = new FuzzedDataProvider(data);
    let fuzzedTicket = {
        leaseId : provider.consumeString(10),
        title: provider.consumeString(),
        description: provider.consumeString(),
        requestTyoe: provider.consumeString(),
        contact: {
            name: provider.consumeString(),
            email: provider.consumeString(),

        }

    //     ticketForm.set('title', 'Test lease');
    // ticketForm.set('description', 'Test description.');
    // ticketForm.set('requestType', 'Cleaning');
    // ticketForm.set('contact[name]', 'Tenant');
    // ticketForm.set('contact[email]', 'tenant@email.com');
    // ticketForm.set('contact[number]', '43120150');
    // ticketForm.append('attachements', new File([test1], 'test1.png', { type: 'image/png' }));
    // ticketForm.append('attachements', new File([test2], 'test2.png', { type: 'image/png' }));
    }
}

module.exports.fuzz = function (data) {
    const fuzzerData = data.toString();
    random(fuzzerData);
    //runTicket(data);
}
