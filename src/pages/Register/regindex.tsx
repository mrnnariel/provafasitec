import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Register() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleRegister(event: FormEvent) {
        event.preventDefault();

        api.post('register', {
            email,
            password
        }).then(() => {
            history.push('/');

        }).catch(() => {

            setShow(true)
        })
    }
