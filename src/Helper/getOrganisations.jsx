import { getFirestore, collectionGroup, collection, getDocs, Timestamp, where} from 'firebase/firestore/lite';

import db from '../Firebase/Firebase';

async function getOrganisations() {
    const orgsCol = collection(db, 'gsoc_archive');
    const orgsSnapshot = await getDocs(orgsCol);
    var orgsList = orgsSnapshot.docs.map(doc => {
        return {...doc.data()}
    });
    console.log('orgs', orgsList);
    return orgsList;
  }

export default getOrganisations;