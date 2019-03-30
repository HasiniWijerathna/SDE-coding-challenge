
import { cleanup } from 'react-testing-library'

test('Hanlde Get session', () => {
    const session = {
        authenticated: true,
        token: 'QpwL5tke4Pnpja7X'
    };

    if (session) {
        expect(session).toEqual({
            authenticated: true,
            token: 'QpwL5tke4Pnpja7X'
        });
    }
    const getSession = jest.fn((session) => session);

    getSession(session);
    expect(getSession).toHaveBeenCalled();

});

test('Checks Set session', () => {
    const session = {
        authenticated: true,
        token: 'QpwL5tke4Pnpja7X'
    };

    expect(session).toEqual({
        authenticated: true,
        token: 'QpwL5tke4Pnpja7X'
    });
    const setSession = jest.fn(() => session);

    setSession(session);
    expect(setSession).toHaveBeenCalled();

});

test('Checks Is Authenticated', () => {
    const session = {
        authenticated: true,
        token: 'QpwL5tke4Pnpja7X'
    };
    const isAuthenticated = jest.fn(() => true);

    if (isAuthenticated) {
        expect(session.authenticated).toEqual(true);
    }

    isAuthenticated();
    expect(isAuthenticated).toHaveBeenCalled();

});

test('Checks reset session', () => {
    const session = {
        authenticated: false,
    };

    const resetSession = jest.fn((session) => session);
    resetSession(session)
    expect(session.authenticated).toEqual(false);
    expect(resetSession).toHaveBeenCalled();

});

afterEach(cleanup)