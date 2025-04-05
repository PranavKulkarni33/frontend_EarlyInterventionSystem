export const environment = {
    production: false,
    cognito: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_bwJYVZpQO',
      userPoolWebClientId: '1m13g1q6glq4c1lui4cg6u8pmu',
      identityPoolId: 'us-east-1:a47c918c-f6ae-41d3-9f68-dfc16fb42329', // OPTIONAL (for AWS services access)
      authenticationFlowType: 'USER_PASSWORD_AUTH' // <- THIS IS CRUCIAL
    }
  };
  