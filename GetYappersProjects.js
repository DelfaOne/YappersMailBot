import fetch from 'node-fetch';
import nodemailer from 'nodemailer';

const url = 'https://app.yappers.club/Project/GetProjectsJson?Take=9&Skip=0';

const fetchOptions = {
  method: 'GET',
  headers: {
    'Cookie': '_ga=GA1.2.2014757192.1703037482; __zlcmid=1JPmMIAGZPKGsFl; _gid=GA1.2.1739799279.1703863535; _gat_UA-157929522-1=1; .AspNet.AppYappers.Web=FQhKPf_hhwuZDLD5QLP7ZCi3oiPdHWR1dD3sqD1ZFnre_LJP9MU5__J_wMLBa31jIdlquS1Mug5FAnDkcNoRW5vzkwS1aCg-McNrRB043Ax860BlvU0eM-u-thlQZjElypsnvcoBdtfBJyWbx8J-71OpZWPSr6VRtGRwUgbNDcmlxYJGA9lfI7fkLs3mm9n0ica-m6bDnyMVzIFmeenigYQJeHLGLFGk1Pa8KYuCsDp3XTOCSF30r_Volzpb8JXPLc9r9fM4hCaJ2gIjRMs88sKMyx-IN7IVQ0qo6dtDThuPfWI8L-Juh3eACfuhsYSVsFXEKRBNHs0x40xrYbqkGXXYshRRJsOchSzMoIrpUtbooXdX9kjpxvA0HU14_YG6gvR5k7TkB1DvqZZalGNoVJ2y12fVGIz1OonnUu1RkSkrvFM4R-vIK9TIvs5mHOYI-RoQaXj57WzBeCo4_2h2f_bjz_p6ZyUbaKi9y4BD3IYrJzWix1cfPwNsIuFPt_7Wt9hpaui2ngjUN-IBWzDWE5Nx7G9NRnzxlt-5kJalV4clsoMqfHBGuZGF9W4ZPey3DEM-QUKJA_0aIh8HoZHN9Aoc2lw-sDnV2MTSh_Y9fZBy59TPSIkv7pgd0yVoIo4-3mqs4Ww5Uw7G0bpYZ2oYP3pc4g5JIjW9G_5HPvszBL2ZVeEXhGd1hvKXMpp9L1aYDgoo4Ot0KOGfCVbMN3hoEw; _ga_JDF6P1NNML=GS1.2.1703863534.7.1.1703863559.0.0.0'
  }
};

fetch(url, fetchOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('La requête a échoué avec le statut : ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    // Traitement de la réponse
    console.log(data);

    // Filtrer les projets avec PriceByTask > 100
    const expensiveProjects = data.filter(project => project.PriceByTask > 100);

    // Envoyer un e-mail s'il y a des projets coûteux
    if (expensiveProjects.length > 0) {
      sendEmail(expensiveProjects);
    }
  })
  .catch(error => {
    console.error('Erreur de requête:', error);
  });

  function sendEmail(expensiveProjects) {
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 2525,
      secure: false,
      tls: {
        rejectUnauthorized: false, // Ajoutez cette ligne
      },
      socketTimeout: 30000,
    });
  
    const mailOptions = {
      from: 'yappersbot@gmail.com',
      to: 'fadel.foudi@gmail.com',
      subject: 'Projets coûteux détectés',
      text: JSON.stringify(expensiveProjects, null, 2)
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      } else {
        console.log('E-mail envoyé avec succès:', info.response);
      }
    });
  }
