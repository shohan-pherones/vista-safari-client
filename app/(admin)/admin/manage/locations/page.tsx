import NavbarFull from '@/components/shared/navbar/navbar-full';
import SectionTitle from '@/components/shared/section-title';
import LocationTable from './_components/location-table';

const ManageLocationsPage = () => {
  return (
    <>
      <NavbarFull />
      <main>
        <section className='container py-20'>
          <SectionTitle
            subtitle='Manage Locations'
            title='Update location details'
          />
          <LocationTable />
        </section>
      </main>
    </>
  );
};

export default ManageLocationsPage;
