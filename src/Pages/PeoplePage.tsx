import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink/PersonLink';
import { getPeople } from '../api';

interface Props {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
}

export const PeoplePage: React.FC<Props> = ({ people, setPeople }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (people.length === 0) {
      getPeople()
        .then(data => setPeople(data))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [people, setPeople]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div className="table-container">
      <h1 className="title">People Page</h1>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => {
            const isSelected = selectedSlug === person.slug;

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={isSelected ? 'has-background-warning' : ''}
                onClick={() => setSelectedSlug(person.slug)}
              >
                <td>
                  <PersonLink
                    personName={person.name ?? undefined}
                    people={people}
                    sex={person.sex}
                  />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    <PersonLink
                      personName={person.motherName}
                      people={people}
                      sex={people.find(p => p.name === person.motherName)?.sex}
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    <PersonLink
                      personName={person.fatherName}
                      people={people}
                      sex={people.find(p => p.name === person.fatherName)?.sex}
                    />
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
