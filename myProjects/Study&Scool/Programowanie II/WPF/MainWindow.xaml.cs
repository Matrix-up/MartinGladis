using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace programowanie_projekt
{
    /// <summary>
    /// Logika interakcji dla klasy MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        SQLiteConnection db = new SQLiteConnection("Data Source=baza.db;");
        SQLiteCommand command;
        public List<string> nazwy { get; set; }
        public string nazwa;
        public string zapytanieSQL;
        public SQLiteDataReader read;
        byte[] byteImg;

        public void SQLquerry(string querry)
        {
            zapytanieSQL = querry;
            command = new SQLiteCommand(zapytanieSQL, db);
            read = command.ExecuteReader();
        }

        public BitmapImage setImage()
        {
            MemoryStream memory = new MemoryStream(byteImg);
            BitmapImage imgSource = new BitmapImage();
            imgSource.BeginInit();
            imgSource.StreamSource = memory;
            imgSource.EndInit();
            return imgSource;
        }

        private void light(object sender, RoutedEventArgs e)
        {
            okno.Background = Brushes.White;
            opis.Foreground = Brushes.Black;
            title.Foreground = Brushes.Black;
            lightChk.Foreground = Brushes.Black;
            darkChk.Foreground = Brushes.Black;
            dane.Foreground = Brushes.Black;
            info.Foreground = Brushes.Black;
            border.BorderBrush = Brushes.Black;
        }

        private void dark(object sender, RoutedEventArgs e)
        {
            okno.Background = new SolidColorBrush(Color.FromRgb(36, 36, 36));
            opis.Foreground = Brushes.White;
            title.Foreground = Brushes.White;
            lightChk.Foreground = Brushes.White;
            darkChk.Foreground = Brushes.White;
            dane.Foreground = Brushes.White;
            info.Foreground = Brushes.White;
            border.BorderBrush = Brushes.White;
        }

        public MainWindow()
        {
            InitializeComponent();
            db.Open();
            SQLquerry("SELECT nazwa FROM Miejsca ORDER BY nazwa");
            nazwy = new List<string>();
            while (read.Read())
                nazwy.Add(read.GetString(0));
            DataContext = this;
        }

        private void select_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            nazwa = wybierz.SelectedItem.ToString();
            SQLquerry("SELECT opis, obraz, kraj, miasto FROM Miejsca WHERE nazwa='" + nazwa + "';");
            while (read.Read())
            {
                opis.Text = read.GetString(0);
                byteImg = (byte[])(read["obraz"]);
                dane.Text = "Kraj: " + read.GetString(2) + "\nMiasto: " + read.GetString(3);
            }
            title.Text = nazwa;
            photo.Source = setImage();
        }
    }
}
