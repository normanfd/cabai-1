<template>
  <div class="tab-pane fade active show" id="custom-tabs-three-permintaan" role="tabpanel" aria-labelledby="custom-tabs-three-permintaan-tab">
    <!-- TABLE -->
    <div class="card">
      <div class="card-header">
        <div class="card-tools">
          
        </div>
      </div>
      <div class="card-body">
        <app-datatable
          :items="items" :fields="fields"
          :meta="meta" @per_page= "handlePerPage"
        @pagination="handlePagination" @search="handleSearch"
          @sort="handleSort" 
          @terimaPermintaanPelanggan="modalAccPermintaan"
          @tolakPermintaanPelanggan="modalTolakPermintaan"
          @kirimCabai="modalKirimPesanan">
        </app-datatable>
      </div>
    </div>
    <!-- END TABLE -->

    <!-- STATE 2-->
    <!-- Modal Penerimaan Permintaan Cabai -->
    <div class="modal fade" id="modalAccPermintaan" tabindex="-1" role="dialog" aria-labelledby="modalAccPermintaanLabel" aria-hidden="true" >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalAccPermintaanLabel">Penerimaan Permintaan Cabai</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="acceptPermintaan()">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-4">
                  <p class="normal text-md-left">Pembeli</p>
                </div>
                <div class="col-md-8">
                  <p>:&ensp; {{temp_nama}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <p class="normal text-md-left">Jenis Cabai</p>
                </div>
                <div class="col-md-8">
                  <p>:&ensp; {{temp_jeniscabai}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <p class="normal text-md-left">Jumlah cabai</p>
                </div>
                <div class="col-md-8">
                  <p>:&ensp; {{temp_jumlahcabai | filterAngkaRibuan}} Kg</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <p class="normal text-md-left">Tanggal diterima</p>
                </div>
                <div class="col-md-8">
                  <p>:&ensp; {{temp_tanggalditerima | dateFilter }}</p>
                </div>
              </div>
              <br>
              <div class>
                <label >Tanggal pengiriman</label>
                <datepicker input-class="form-control" placeholder="Masukan tanggal Pengiriman" v-model="form.tanggal_pengiriman" :format="customFormatter" id="tanggal_pengiriman" :class="{ 'is-invalid': form.errors.has('tanggal_pengiriman') }"></datepicker>
                <has-error :form="form" field="tanggal_pengiriman"></has-error>
              </div>
              <br />
              <div class>
                <label>Harga per Kg</label>
                <input v-model="form.harga" type="number" name="harga" class="form-control"  placeholder="Harga per Kg" required :class="{ 'is-invalid': form.errors.has('harga') }"/>
                <has-error :form="form" field="Penawaran harga"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
              <button id="btnAccPermintaan" type="submit" class="btn btn-primary">Terima</button>
            </div>
          </form>
          <!-- </form> -->
        </div>
      </div>
    </div>
    <vue-progress-bar></vue-progress-bar>
    <!-- Modal Penolakan permintaan Cabai -->
    <div class="modal fade" id="modalTolakPermintaan" tabindex="-1" role="dialog" aria-labelledby="modalTolakPermintaanLabel" aria-hidden="true" >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTolakPermintaanLabel">Penolakan Permintaan Cabai</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="rejectPermintaan()">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-3">
                  <p class="normal text-md-left">Pembeli</p>
                </div>
                <div class="col-md-9">
                  <p>:&ensp; {{temp_nama}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <p class="normal text-md-left">Jenis Cabai</p>
                </div>
                <div class="col-md-9">
                  <p>:&ensp; {{temp_jeniscabai}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <p class="normal text-md-left">Jumlah cabai</p>
                </div>
                <div class="col-md-9">
                  <p>:&ensp; {{temp_jumlahcabai | filterAngkaRibuan }} Kg</p>
                </div>
              </div>
              <br>
              <div class>
                <label>Alasan penolakan</label>
                <textarea v-model="formReject.keterangan" type="textarea" name="keterangan" class="form-control" placeholder="Masukan alasan penolakan" :class="{ 'is-invalid': formReject.errors.has('keterangan') }" required/>
                <has-error :form="formReject" field="Penawaran harga"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button id="btnTolakPermintaan" type="submit" class="btn btn-primary">Tolak</button>
            </div>
          </form>
          <!-- </form> -->
        </div>
      </div>
    </div>
    <!-- END STATE 2-->
    <!-- STATE 3 -->
    <div class="modal fade" id="modalKirimPermintaan" tabindex="-1" role="dialog" aria-labelledby="modalKirimPermintaanLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalKirimPermintaanLabel">Pengiriman Permintaan Cabai</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="kirimPesanan()">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-3">
                  <p class="normal text-md-left">Pembeli</p>
                </div>
                <div class="col-md-9">
                  <p>:&ensp; {{temp_nama}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <p class="normal text-md-left">Jenis Cabai</p>
                </div>
                <div class="col-md-9">
                  <p>:&ensp; {{temp_jeniscabai}}</p>
                </div>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th>Jumlah Permintaan</th>
                    <th>Jumlah dimiliki</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{temp_jumlahcabai}} Kg</td>
                    <td>{{temp_inv_jumlahcabai}} Kg</td>
                  </tr>
                </tbody>
              </table>
              <table class="table">
                <thead>
                  <tr>
                    <th>Harga permintaan</th>
                    <th>Rata-rata harga jual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{temp_hargacabai}} /Kg</td>
                    <td>{{temp_inv_hargacabai}} /Kg</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
              <button id="btnKirimPesanan" type="submit" class="btn btn-primary">Kirim</button>
            </div>
          </form>
          <!-- </form> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import datepicker from "vuejs-datepicker";
import KemitraanDatatable from '../components/datatable/DistribusiDatatable'
export default {
  components: {
    datepicker,
    'app-datatable': KemitraanDatatable
  },
  data() {
    return {
      fields:[
        { key: 'nama', sortable: true, label:"Pelanggan"},
        { key: 'jenis_cabai', sortable: true, label:"Jenis"},
        { key: 'jumlah_cabai', sortable: true, label:"Jumlah"},
        { key: 'tanggal_diterima', sortable: true, label:"Tgl terima"},
        { key: 'tanggal_pengiriman', sortable: true, label:"Tgl kirim"},
        { key: 'harga', sortable: true, label:"Harga"},
        { key: 'statusPemasok', sortable: true, label:"Status"},
        { key: 'keterangan', sortable: true, label:"Keterangan"},
        { key: 'AksiPemasok', sortable: false, label:"Aksi"},
      ],
      items: [],
      meta: [],
      current_page: 1,
      per_page: 10,
      search: '',
      sortBy: 'updated_at',
      sortByDesc: false,

      form: new Form({
        id: "",
        tanggal_pengiriman: "",
        harga: ""
      }),
      formReject: new Form({
        id: "",
        keterangan: ""
      }),
      formSend: new Form({
        jenis_cabai: "",
        jumlah_cabai: "",
        harga: "",
        id: ""
      }),
      // Temporary variable
      temp_nama: "",
      temp_jeniscabai: "",
      temp_jumlahcabai: "",
      temp_hargacabai: "",
      temp_tanggalditerima: "",
      temp_inv_jumlahcabai: "",
      temp_inv_hargacabai: "",
      // for update keterangan
      keterangan: "",
      dataDistribusi: {},
    };
  },
  created(){
    this.getDistribusiPemasok()
    this.getStok()
  },
  methods: {
    getDistribusiPemasok(){
      let current_page = this.search == '' ? this.current_page : 1
      axios.get("/transaksi/permintaanMasuk/list", {
        params: {
          page: current_page,
          per_page: this.per_page,
          q: this.search,
          sortby: this.sortBy,
          sortbydesc: this.sortByDesc ? 'DESC' : 'ASC'
        }
      })
      .then((response) => {
        let getData = response.data.data
        this.items = getData.data,
        this.meta = {
          total: getData.total,
          current_page: getData.current_page,
          per_page: getData.per_page,
          from: getData.from,
          to: getData.to
        }
      })
    },
    handlePerPage(val) {
        this.per_page = val 
        this.getDistribusiPemasok() 
    },
    handlePagination(val) {
        this.current_page = val 
        this.getDistribusiPemasok()
    },
    handleSearch(val) {
        this.search = val 
        this.getDistribusiPemasok()
    },
    handleSort(val) {
        this.sortBy = val.sortBy
        this.sortByDesc = val.sortDesc
        this.getDistribusiPemasok()
    },
    acceptPermintaan() {
      document.getElementById("btnAccPermintaan").disabled = true;
      this.$Progress.start();
      this.form.put("/transaksi/permintaanMasuk/terima/" + this.form.id)
        .then(() => {
          this.getDistribusiPemasok()
          $("#modalAccPermintaan").trigger("click");
          toast.fire({ icon: "success", title: "Permintaan berhasil diterima"});
          this.$Progress.finish();
          document.getElementById("btnAccPermintaan").disabled = false;
        })
        .catch(() => {
          document.getElementById("btnAccPermintaan").disabled = false;
          this.$Progress.finish();
        });
    },
    rejectPermintaan() {
      document.getElementById("btnTolakPermintaan").disabled = true;
      this.$Progress.start();
      this.formReject
        .put("/transaksi/permintaanPembeli/tolak/" + this.formReject.id)
        .then(() => {
          this.getDistribusiPemasok()
          // hide modal
          $("#modalTolakPermintaan").trigger("click");
          toast.fire({
            icon: "success",
            title: "Permintaan berhasil ditolak"
          });
          this.$Progress.finish();
          document.getElementById("btnTolakPermintaan").disabled = false;
        })
        .catch(() => {
          document.getElementById("btnTolakPermintaan").disabled = false;
          this.$Progress.fail();
        });
    },
    modalAccPermintaan(data) {
      $("#modalAccPermintaan").modal("show");
      this.form.id = data.id;
      this.temp_nama = data.nama;
      this.temp_jeniscabai = data.jenis_cabai;
      this.temp_jumlahcabai = data.jumlah_cabai;
      this.temp_tanggalditerima = data.tanggal_diterima;
    },
    modalTolakPermintaan(data) {
      $("#modalTolakPermintaan").modal("show");
      this.formReject.id = data.id;
      this.temp_nama = data.nama;
      this.temp_jeniscabai = data.jenis_cabai;
      this.temp_jumlahcabai = data.jumlah_cabai;
    },
    customFormatter(date) {
      return moment(date).format("DD MMMM YYYY");
    },
    convertToRupiah(angka) {
      var rupiah = "";
      var angkarev = angka
        .toString()
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
      return (
        "Rp. " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("")
      );
    },
    modalKirimPesanan(data) {
      $("#modalKirimPermintaan").modal("show");
      this.formSend.id = data.id;
      this.formSend.jenis_cabai = data.jenis_cabai;
      this.formSend.harga = data.harga;
      this.formSend.jumlah_cabai = data.jumlah_cabai;

      this.temp_nama = data.nama;
      this.temp_jeniscabai = data.jenis_cabai;
      this.temp_jumlahcabai = data.jumlah_cabai;
      this.temp_hargacabai = data.harga;
      this.temp_tanggalditerima = data.tanggal_diterima;

      axios.get("/inventaris/list").then(response => {
        console.log(response.data.data[0].jenis_cabai);
        if (data.jenis_cabai == "Cabai besar") {
          this.temp_inv_jumlahcabai = response.data.data[0].jumlah_cabai;
          this.temp_inv_hargacabai = response.data.data[0].harga;
        } else if (data.jenis_cabai == "Cabai rawit") {
          this.temp_inv_jumlahcabai = response.data.data[1].jumlah_cabai;
          this.temp_inv_hargacabai = response.data.data[1].harga;
        } else {
          this.temp_inv_jumlahcabai = response.data.data[2].jumlah_cabai;
          this.temp_inv_hargacabai = response.data.data[2].harga;
        }
        if (this.temp_jumlahcabai < this.temp_inv_jumlahcabai) {
          document.getElementById("btnKirimPesanan").disabled = false;
        } else {
          document.getElementById("btnKirimPesanan").disabled = true;
        }
      });
    },
    kirimPesanan() {
      document.getElementById("btnKirimPesanan").disabled = true;
      this.$Progress.start();
      this.formSend
        .put("/inventaris/stokKeluar/" + this.formSend.id)
        .then(() => {
          this.getDistribusiPemasok()
          $("#modalKirimPermintaan").trigger("click");
          toast.fire({
            icon: "success",
            title: "Pesanan berhasil dikirim"
          });
          this.$Progress.finish();
          document.getElementById("btnKirimPesanan").disabled = false;
        })
        .catch(() => {
          document.getElementById("btnKirimPesanan").disabled = false;
          this.$Progress.finish();
        });
    },
    getStok() {
      axios.get("/inventaris/list").then(response => {
        // console.log(response.data)
        this.temp_inv_jumlahcabai = response.data.jumlah_cabai;
        this.temp_inv_hargacabai = response.data.harga;
      });
    }
  }
};
</script>