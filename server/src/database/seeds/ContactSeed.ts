import { DataSource } from 'typeorm';
import { Contact } from '../../contacts/contact.entity';

export async function seedContacts(dataSource: DataSource) {
  const contactRepository = dataSource.getRepository(Contact);

  const contacts = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234567890',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+61 76543210',
    },
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '+94 719900373',
    },
  ];

  await contactRepository.save(contacts);
  console.log('Contacts seeded successfully!');
}
