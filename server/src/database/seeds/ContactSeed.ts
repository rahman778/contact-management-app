import { DataSource } from 'typeorm';
import { Contact } from '../../contacts/contact.entity'; // Adjust the path to your entity

export async function seedContacts(dataSource: DataSource) {
  const contactRepository = dataSource.getRepository(Contact);

  const contacts = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
    },
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '555-555-5555',
    },
  ];

  await contactRepository.save(contacts);
  console.log('Contacts seeded successfully!');
}
