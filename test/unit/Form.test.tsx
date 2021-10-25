import { it, expect, describe } from '@jest/globals';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from '../../src/client/components/Form';
import { CheckoutFormData } from '../../src/common/types';
import { getApplication } from './getApplication';

const inputs: CheckoutFormData = {
    name: 'test name',
    phone: '1231233123',
    address: 'test address',
};

describe('Form test', () => {
    it('prevent submit with empty Address', () => {
        let isSubmitted = false;
        const onSubmit = () => (isSubmitted = true);

        const { application } = getApplication(
            () => <Form onSubmit={onSubmit} />,
            {}
        );

        const { getByLabelText, container } = render(application);

        userEvent.type(getByLabelText('Name'), inputs.name);
        userEvent.type(getByLabelText('Phone'), inputs.phone);

        userEvent.click(container.querySelector('button'));

        expect(isSubmitted).toBeFalsy();
    });

    it('prevent submit with empty Phone', () => {
        let isSubmitted = false;
        const onSubmit = () => (isSubmitted = true);

        const { application } = getApplication(
            () => <Form onSubmit={onSubmit} />,
            {}
        );

        const { getByLabelText, container } = render(application);

        userEvent.type(getByLabelText('Name'), inputs.name);
        userEvent.type(getByLabelText('Address'), inputs.address);

        userEvent.click(container.querySelector('button'));

        expect(isSubmitted).toBeFalsy();
    });

    it('prevent submit with empty Name', () => {
        let isSubmitted = false;
        const onSubmit = () => (isSubmitted = true);

        const { application } = getApplication(
            () => <Form onSubmit={onSubmit} />,
            {}
        );

        const { getByLabelText, container } = render(application);

        userEvent.type(getByLabelText('Phone'), inputs.phone);
        userEvent.type(getByLabelText('Address'), inputs.address);

        userEvent.click(container.querySelector('button'));

        expect(isSubmitted).toBeFalsy();
    });

    it('prevent submit with wrong Name', () => {
        let isSubmitted = false;
        const onSubmit = () => (isSubmitted = true);

        const { application } = getApplication(
            () => <Form onSubmit={onSubmit} />,
            {}
        );

        const { getByLabelText, container } = render(application);

        userEvent.type(getByLabelText('Name'), inputs.name);
        userEvent.type(getByLabelText('Phone'), 'not phone');
        userEvent.type(getByLabelText('Address'), inputs.address);

        userEvent.click(container.querySelector('button'));

        expect(isSubmitted).toBeFalsy();
    });

    it('get data on submit', async () => {
        let submitData = null;
        const onSubmit = (data: CheckoutFormData) => (submitData = data);

        const { application } = getApplication(
            () => <Form onSubmit={onSubmit} />,
            {}
        );

        const { getByLabelText, container } = render(application);

        userEvent.type(getByLabelText('Name'), inputs.name);
        userEvent.type(getByLabelText('Phone'), inputs.phone);
        userEvent.paste(getByLabelText('Address'), inputs.address);

        userEvent.click(container.querySelector('button'));

        expect(submitData).toEqual(inputs);
    });
});
