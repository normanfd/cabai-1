import VueRouter from 'vue-router'


// Pages
import Register from './pages/Register'
import Login from './pages/Login'
import UnverifiedDashboard from './pages/UnverifiedDashboard'
import NotfoundLoggedUser from './pages/NotFoundLoggedUser'
import NotFoundNonLoggedUser from './pages/NotFoundNonLoggedUser'

// Pages - SCM
import AdminMaster from './pages/scm/admin/Master'
import DashboardAdmin from './pages/scm/admin/Dashboard'
import UserValidation from './pages/scm/admin/UserValidation'
import UserManagement from './pages/scm/admin/UserManagement'

import MasterProd from './pages/scm/produsen/Master' // prod == produsen
import DashboardProd from './pages/scm/produsen/Dashboard' 
import ManajemenLahan from './pages/scm/produsen/ManajemenLahan'
import RiwayatPengeluaran from './pages/scm/produsen/RiwayatPengeluaran'
import DaftarMitraProd from './pages/scm/produsen/DaftarMitra'
import PengajuanMitraProd from './pages/scm/produsen/PengajuanMitra'
import PermintaanMitraProd from './pages/scm/produsen/PermintaanMitra'
import TransaksiPelangganProd from './pages/scm/produsen/TransaksiPelanggan'

import MasterPengepul from './pages/scm/pengepul/Master' // pengepul
import DashboardPengepul from './pages/scm/pengepul/Dashboard'
import DaftarMitraPengepul from './pages/scm/pengepul/DaftarMitra'
import PengajuanMitraPengepul from './pages/scm/pengepul/PengajuanMitra'
import PermintaanMitraPengepul from './pages/scm/pengepul/PermintaanMitra'
import TransaksiPelangganPengepul from './pages/scm/pengepul/TransaksiPelanggan'
import TransaksiPemasokPengepul from './pages/scm/pengepul/TransaksiPemasok'

import MasterGrosir from './pages/scm/grosir/Master' // grosir
import DashboardGrosir from './pages/scm/grosir/Dashboard'
import DaftarMitraGrosir from './pages/scm/grosir/DaftarMitra'
import PengajuanMitraGrosir from './pages/scm/grosir/PengajuanMitra'
import PermintaanMitraGrosir from './pages/scm/grosir/PermintaanMitra'
import TransaksiPelangganGrosir from './pages/scm/grosir/TransaksiPelanggan'
import TransaksiPemasokGrosir from './pages/scm/grosir/TransaksiPemasok'

import MasterPengecer from './pages/scm/pengecer/Master' // pengecer
import DashboardPengecer from './pages/scm/pengecer/Dashboard'
import DaftarMitraPengecer from './pages/scm/pengecer/DaftarMitra'
import PengajuanMitraPengecer from './pages/scm/pengecer/PengajuanMitra'
import PermintaanMitraPengecer from './pages/scm/pengecer/PermintaanMitra'
import TransaksiPelangganPengecer from './pages/scm/pengecer/TransaksiPelanggan'
import TransaksiPemasokPengecer from './pages/scm/pengecer/TransaksiPemasok'

// Pages - Bisnis Analitik
import BAMaster from './pages/ba/Master'
import BisnisAnalitikProd from './pages/ba/produsen/bisnisAnalitik'
import BisnisAnalitikPengepul from './pages/ba/pengepul/BisnisAnalitik'
import BisnisAnalitikGrosir from './pages/ba/grosir/BisnisAnalitik'
import BisnisAnalitikPengecer from './pages/ba/pengecer/BisnisAnalitik'

// Routes
const routes = [
    // SCM
    {
        path: '/admin',
        component: AdminMaster,
        meta: {
            auth: {
                roles: 1,
                redirect: {
                    name: 'login'
                },
                forbiddenRedirect: '/403'
            }
        },
        children: [{
                path: '',
                component: DashboardAdmin,
                name: "DashboardAdmin"
            },
            {
                path: 'usermanagement',
                component: UserManagement,
                name: "UserManagement"
            },
            {
                path: 'uservalidation',
                component: UserValidation,
                name: "UserValidation"
            },
            { path: '*', component: NotfoundLoggedUser },
        ]
    },
    {
        path: '/produsen',
        component: MasterProd,
        children: [
            {
                path: '',
                component: DashboardProd,
                name: "DashboardProd"
            },
            {
                path: 'manajemenlahan',
                component: ManajemenLahan,
                name: "ManajemenLahanProd"
            },
            {
                path: 'riwayatpengeluaran',
                component: RiwayatPengeluaran,
                name: "RiwayatPengeluaran"
            },
            {
                path: 'daftarmitra',
                component: DaftarMitraProd,
                name: "DaftarMitraProd"
            },
            {
                path: 'permintaanmitra',
                component: PermintaanMitraProd,
                name: "PermintaanMitraProd"

            },
            {
                path: 'pengajuanmitra',
                component: PengajuanMitraProd,
                name: "PengajuanMitraProd"
            },
            {
                path: 'transaksipelanggan',
                component: TransaksiPelangganProd,
                name: "TransaksiPelangganProd"
            },
            {
                path: 'analitik',
                component: BisnisAnalitikProd,
                name: "BisnisAnalitikProd"
            },
        ]
    },
    {
        path: '/grosir',
        component: MasterGrosir,
        children: [
            {
                path: '',
                component: DashboardGrosir,
                name: "DashboardGrosir"
            },
            {
                path: 'daftarmitra',
                component: DaftarMitraGrosir,
                name: "DaftarMitraGrosir"
            },
            {
                path: 'permintaanmitra',
                component: PermintaanMitraGrosir,
                name: "PermintaanMitraGrosir"

            },
            {
                path: 'pengajuanmitra',
                component: PengajuanMitraGrosir,
                name: "PengajuanMitraGrosir"
            },
            {
                path: 'transaksipelanggan',
                component: TransaksiPelangganGrosir,
                name: "TransaksiPelangganGrosir"
            },
            {
                path: 'transaksipemasok',
                component: TransaksiPemasokGrosir,
                name: "TransaksiPemasokGrosir"
            },
            {
                path: 'analitik',
                component: BisnisAnalitikGrosir,
                name: "BisnisAnalitikGrosir"
            },
        ]
    },
    {
        path: '/pengecer',
        component: MasterPengecer,
        children: [
            {
                path: '',
                component: DashboardPengecer,
                name: "DashboardPengecer"
            },
            {
                path: 'daftarmitra',
                component: DaftarMitraPengecer,
                name: "DaftarMitraPengecer"
            },
            {
                path: 'permintaanmitra',
                component: PermintaanMitraPengecer,
                name: "PermintaanMitraPengecer"

            },
            {
                path: 'pengajuanmitra',
                component: PengajuanMitraPengecer,
                name: "PengajuanMitraPengecer"
            },
            {
                path: 'transaksipelanggan',
                component: TransaksiPelangganPengecer,
                name: "TransaksiPelangganPengecer"
            },
            {
                path: 'transaksipemasok',
                component: TransaksiPemasokPengecer,
                name: "TransaksiPemasokPengecer"
            },
            {
                path: 'analitik',
                component: BisnisAnalitikPengecer,
                name: "BisnisAnalitikPengecer"
            },
        ]
    },
    {
        path: '/pengepul',
        component: MasterPengepul,
        children: [
            {
                path: '',
                component: DashboardPengepul,
                name: "DashboardPengepul"
            },
            {
                path: 'daftarmitra',
                component: DaftarMitraPengepul,
                name: "DaftarMitraPengepul"
            },
            {
                path: 'permintaanmitra',
                component: PermintaanMitraPengepul,
                name: "PermintaanMitraPengepul"

            },
            {
                path: 'pengajuanmitra',
                component: PengajuanMitraPengepul,
                name: "PengajuanMitraPengepul"
            },
            {
                path: 'transaksipelanggan',
                component: TransaksiPelangganPengepul,
                name: "TransaksiPelangganPengepul"
            },
            {
                path: 'transaksipemasok',
                component: TransaksiPemasokPengepul,
                name: "TransaksiPemasokPengepul"
            },
            {
                path: 'analitik',
                component: BisnisAnalitikPengepul,
                name: "BisnisAnalitikPengepul"
            },
        ]
    },
    { path: '*', component: NotFoundNonLoggedUser },
    {
        path: '/',
        name: 'bisnisanalitik',
        component: BAMaster
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },
    // USER ROUTES
    // {
    //     path: '/dashboard/',
    //     name: 'dashboard',
    //     component: Dashboard,
    //     beforeEnter: (to, from, next) => {
    //         if (to.meta.requiresVerified) {
    //             console.log("dirouterjs")

    //             // custom payloads
    //             var datatoken = []
    //             const url = "/user/getcustompayloads"
    //             const axiosTest = axios.get
    //             axiosTest(url).then(function (axiosTestResult) {
    //                 datatoken = axiosTestResult.data
    //                 var status = (datatoken.confirmed)
    //                 if (status === 0) {
    //                     next('unverified')
    //                 } else {
    //                     next();
    //                 }
    //                 // console.log(datatoken.email)
    //                 console.log("kalomuncultandanyasukses")
    //             });
    //         }
    //     },
    //     meta: {
    //         auth: true,
    //         requiresVerified: true,
    //     }
    // },
    {
        path: '/unverified',
        name: 'unverifiedDashboard',
        component: UnverifiedDashboard,
        beforeEnter: (to, from, next) => {
            if (to.meta.requiresVerified) {
                var datatoken = []
                const url = "/user/getcustompayloads"
                const axiosTest = axios.get
                axiosTest(url).then(function (axiosTestResult) {
                    datatoken = axiosTestResult.data
                    var status = (datatoken.confirmed)
                    var role = datatoken.role
                    console.log(role)
                    if (status === 1) {
                        next('dashboard')
                    } else {
                        next();
                    }
                });
            }
        },
        meta: {
            auth: true,
            requiresVerified: true,
        }
    },
    // ADMIN ROUTES
    // {
    //     path: '/admin',
    //     name: 'admin.dashboard',
    //     component: AdminDashboard,
    //     meta: {
    //         auth: {
    //             roles: 1,
    //             redirect: {
    //                 name: 'login'
    //             },
    //             forbiddenRedirect: '/403'
    //         }
    //     }
    // },
    // {
    //     path: '/:userId/details',
    //     name: 'userDetails',
    //     component: UserDetails,
    //     meta: {
    //         auth: {
    //             roles: 1,
    //             redirect: {
    //                 name: 'login'
    //             },
    //             forbiddenRedirect: '/403'
    //         }
    //     }
    // },
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
})

export default router
