const User = require('./userModel'); 


User.create([
    {
        googleId: 'dummyGoogleId1',

    },
    {
        googleId: 'dummyGoogleId2',
        
    },

])
    .then(() => {
        console.log('Dummy data inserted.');
    })
    .catch((error) => {
        console.error('Error inserting dummy data:', error);
    });
