import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';

export async function openDatabase() {
  let db=null;
  const dbName = 'song.db';
  const dbAsset = Asset.fromModule(require('../assets/song.db'));
  const dbUri = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  // Télécharge l’asset si nécessaire
  await dbAsset.downloadAsync();

  // Créer le dossier SQLite s’il n’existe pas
  await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });

  // Vérifier si le fichier existe
  const fileInfo = await FileSystem.getInfoAsync(dbUri);
  if (!fileInfo.exists) {
    await FileSystem.copyAsync({
      from: dbAsset.localUri || dbAsset.uri,
      to: dbUri,
    });
  }

if(!db){
  db = SQLite.openDatabaseAsync(dbName);
}
 return db;
}
