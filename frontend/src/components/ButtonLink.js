import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function ButtonLink(props) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(props.to)}
            text={props.text} />
  );
}
