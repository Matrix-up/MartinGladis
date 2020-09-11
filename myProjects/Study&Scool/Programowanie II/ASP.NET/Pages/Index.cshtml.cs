using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using WebApp.Model;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;
using System.IO;

namespace WebApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ConnectionStringClass db;

        public IndexModel(ConnectionStringClass db)
        {
            this.db = db;
        }
        public IEnumerable<EmpClass> displaydata { get; set; }
        public IEnumerable<EmpClass> selectPlace { get; set; }

        public bool state { get; set; }
        public string nazwa { get; set; }
        public string kraj { get; set; }
        public string miasto { get; set; }
        public string location { get; set; }
        public int id { get; set; }

        public void OnGet()
        {
            displaydata = db.Miejsca.ToList();
            selectPlace = db.Miejsca.ToList();
            location = "/Images/" + DescripionPlace.id.ToString() + ".jpg";
            state = DescripionPlace.state;
            kraj = DescripionPlace.kraj;
            miasto = DescripionPlace.miasto;
            nazwa = DescripionPlace.nazwa;
        }

        public void OnPost(int selectedPlace)
        {
            displaydata = db.Miejsca.ToList();
            selectPlace = (from x in db.Miejsca where (x.id_miejsca == selectedPlace) select x).ToList();
            state = DescripionPlace.state = true;
            foreach(var x in selectPlace)
            {
                DescripionPlace.kraj = x.kraj;
                DescripionPlace.miasto = x.miasto;
                DescripionPlace.opis = x.opis;
                DescripionPlace.nazwa = x.nazwa;
                DescripionPlace.id = x.id_miejsca;
            }
            location = "/Images/" + DescripionPlace.id.ToString() + ".jpg";
            id = DescripionPlace.id;
            kraj = DescripionPlace.kraj;
            miasto = DescripionPlace.miasto;
            nazwa = DescripionPlace.nazwa;
            
        }
    }
}
