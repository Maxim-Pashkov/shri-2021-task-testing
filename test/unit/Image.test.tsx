import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { Image } from '../../src/client/components/Image';


describe('Image test', () => {
    it('Image outputed', () => {
        const application = <Image />;

        const { container } = render(application);

        expect(container.firstChild).toMatchSnapshot();
    });
});
