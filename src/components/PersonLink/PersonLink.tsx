import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  personName?: string;
  people: Person[];
  sex?: string;
}

export const PersonLink: React.FC<Props> = ({ personName, people, sex }) => {
  const person = people.find(p => p.name === personName);

  if (!personName) {
    return <span>-</span>;
  }

  if (!person) {
    return <span>{personName}</span>;
  }

  const colorClass = sex === 'f' ? 'has-text-danger' : 'has-text-primary';

  return (
    <Link to={`/people/${person.slug}`} className={colorClass}>
      {personName}
    </Link>
  );
};
