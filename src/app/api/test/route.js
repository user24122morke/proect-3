import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data.json'); // Calea către fișierul JSON

export async function GET(req) {
    try {
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8'); // Citim datele din fișier
        const data = fileData ? JSON.parse(fileData) : []; // Parsăm JSON-ul
        return NextResponse.json(data, { status: 200 }); // Returnăm datele
      } else {
        return NextResponse.json({ message: 'Fișierul data.json nu există.' }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Eroare la citirea fișierului.', details: error.message },
        { status: 500 }
      );
    }
  }

  export async function POST(req) {
    try {
      const body = await req.json();
  
      if (!body || !body.address) {
        return NextResponse.json(
          { error: 'Invalid data format or missing "address"' },
          { status: 400 }
        );
      }
  
      const { address, recipient, amount, trx, usdt, timestamp, transactionStatus } = body;
  
      let existingData = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        existingData = fileData ? JSON.parse(fileData) : [];
      }
  
      // Găsim intrarea existentă pentru adresa specificată
      const existingEntry = existingData.find((entry) => entry.address === address);
  
      if (existingEntry) {
        // Actualizăm câmpurile furnizate, păstrând restul intacte
        if (trx !== undefined) existingEntry.trx = trx; // Actualizează doar dacă trx este furnizat
        if (usdt !== undefined) existingEntry.usdt = usdt; // Actualizează doar dacă usdt este furnizat
        if (timestamp) existingEntry.timestamp = timestamp; // Actualizează timestamp dacă este furnizat
        if (transactionStatus) existingEntry.transactionStatus = transactionStatus; // Status tranzacție
        if (recipient && amount) {
          // Actualizăm ultima tranzacție doar dacă avem recipient și amount
          existingEntry.lastTransaction = {
            recipient,
            amount,
          };
        }
      } else {
        // Adăugăm o nouă intrare dacă adresa nu există
        existingData.push({
          address,
          trx: trx || 0, // Valoare implicită 0 dacă trx nu este furnizat
          usdt: usdt || 0, // Valoare implicită 0 dacă usdt nu este furnizat
          timestamp: timestamp || new Date().toISOString(), // Timpul curent dacă timestamp nu este furnizat
          transactionStatus: transactionStatus || "Unknown",
          lastTransaction: recipient && amount
            ? { recipient, amount }
            : undefined, // Setăm doar dacă recipient și amount sunt furnizate
        });
      }
  
      // Scriem datele actualizate în fișier
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
  
      return NextResponse.json({ message: 'Data processed successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: 'Internal server error', details: error.message },
        { status: 500 }
      );
    }
  }
  

export async function DELETE(req) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Ștergem fișierul
        return NextResponse.json({ message: 'Fișierul data.json a fost șters.' }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Fișierul nu există.' }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Eroare la ștergerea fișierului.', details: error.message },
        { status: 500 }
      );
    }
  }
