import React from 'react';
import { Page } from 'controls';

export default () => (
  <Page name="Get Started">
    <h2>Hello Andrei!</h2>
    <p>Am portat contact-list ul tau in acest proiect. Il vei gasi in folderul /components</p>
    <p>Este un proiect configurat cu webpack, babel si postcss + cssmodules. Nu mai trebuie sa folosesti codepen degeaba.</p>
    <p>E o versiunie 'subtiata' a proiectului pe care lucram noi.</p>
    <p>Momentan, nu are rost sa te preocupi prea mult de cum este configurat. Ce te intereseaza sunt folderele <strong>/components</strong> si <strong>/site/pages</strong></p>
    <p>As vrea sa continuam cu ContactList-ul adaugand urmatoarele:</p>
    <ul>
      <li>- Separa componentele secundare (Contact, Photo ...) din contact list, in foldere/fisiere separate. poti urma structura de pe proiect daca vrei, dar nu este obligatoriu momentan</li>
      <li>- As vrea sa avem posibilitatea, sa salvam(serializam) si sa incarcam contactele, in/din LocalStorage. Pentru imagini, as vrea sa putem serializa un resource URI. Dar, nu e necesar neaparat. Putem pune un placeholder.</li>
      <li>- Ar fi super daca am putea adauga contacte noi printr-un simplu formular fie intr-o pagina separata, fie intr-un modal/popup</li>
      <li>- As vrea ca lista de contacte sa se incarce din localStorage mai intai, si daca nu gaseste nimic acolo, sa faca fetch</li>
      <li>- Ar fi interesant, sa putem avea mai multe Theme's pentru ContactList. Dar va trebui sa vedem dupa celelate cum, pentru ca as vrea sa ne folosim de react-themer.</li>
    </ul>
  </Page>
);
