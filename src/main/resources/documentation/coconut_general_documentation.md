


### Citation guidelines:

If you use data from COCONUT Online, appropriate citation enables readers to locate the original source of the work. 

COCONUT dataset provisory DOI: [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3778405.svg)](https://doi.org/10.5281/zenodo.3778405)





###  Simple search

#### Molecule name
The user may write a molecule name as IUPAC, Trivial, or any other synonym. When a user enters any widely used name of the natural product, the search engine will recognize it successfully. The software output will be a group of compounds that contain the inputted name in its title.
 
#### InChI-IUPAC International Chemical Identifier (InChI)
The InChI is a non-proprietary identifier for chemical substances that is widely used in electronic data sources. It expresses chemical structures in terms of atomic connectivity, tautomeric state, isotopes, stereochemistry, and electronic charge in order to produce a string of machine-readable characters unique to the particular molecule. Therefore, when InChl name is entered, the software output will be a unique inputted compound with all required characteristics.
 
#### InChI key
The InChIKey is a 25-character hashed version of the full InChI, designed to allow for easy web searches of chemical compounds. InChIKeys consist of 14 characters resulting from a hash of the connectivity information from the full InChI string, followed by a hyphen, followed by 8 characters resulting from a hash of the remaining layers of the InChI, followed by a single character indicating the version of InChI used, followed by single checksum character. Therefore, when the user enters the InChl key, the software output will be a single compound that is recognized by a particular InChl key.
#### Molecular formula
The molecular formula is a type of chemical formula that shows the kinds of atoms and the number of each kind in a single molecule of a particular compound. The molecular formula doesn’t show any information about the molecule structure. The structures and characteristics of compounds with the same molecular formula may vary significantly. Hence, by entering a molecular formula into the search bar, the software output will be a group of compounds with specified atoms and their numbers within a single molecule.  
#### Coconut ID
Every natural product in our database has its unique identification number that may be used for search purposes exclusively at our site.


### Structure search

Easy and applicable way to explore all characteristics of compounds of interest. The vast number of functional groups often causes issues to name the compound appropriately. Therefore, usage of structure search is a great way to discover all characteristics of a compound just by providing its visual depiction. Our software successfully recognizes InChl and canonical SMILES structures. 

#### Exact match

1. InChI structural formulas

The following types of InChl structure formulas  are recognized by our search engine:

* The expanded structural formula shows all of the bonds connecting all of the atoms within the compound.
* The condensed structural formula shows the symbols of atoms in order as they appear in the molecule's structure while most of the bond dashes are excluded. The vertical bonds are always excluded, while horizontal bonds may be included to specify polyatomic groups. If there is a repetition of a polyatomic group in the chain, parentheses are used to enclose the polyatomic group. The subscript number on the right side of the parentheses represents the number of repetitions of the particular group.  The proper condensed structural formula should be written on a single horizontal line without branching in any direction.
* The skeletal formula represents the carbon skeleton and function groups attached to it. In the skeletal formula, carbon atoms and hydrogen atoms attached to them are not shown. The bonds between carbon lines are presented as well as bonds to functional groups.
 
 
2. Canonical SMILES structural formulas

The canonical SMILES structure is a unique string that can be used as a universal identifier for a specific chemical structure including stereochemistry of a compound. Therefore, canonical SMILES provides a unique form for any particular molecule.
 The user has to choose an option that is more convenient to him and then proceed with the structure drawing.

* The 3D structure of the molecule is commonly used for the description of simple molecules. In this type of structure drawing, all types of covalent bonds are presented with respect to their spatial orientation. The usage of models is the best way to  pursue a 3D structure drawing. The valence shell repulsion pair theory proposes five main models of simple molecules: linear, trigonal planar, tetrahedral, trigonal bipyramidal, and octahedral.


#### Substructure search

A suitable way of searching for a particular compound when one of its parts is known to the user. Both, InChl and Canonical SMILES structural formulas may be used in substructure search. There are three ways of our software computation during the search operation:
 
1. Default substructure search (Ullmann algorithm). The Ullmann algorithm is a backtracking procedure that utilizes a relaxation-based reﬁnement step to reduce the search space. The refinement is the most important step of the algorithm. It basically evaluates the surrounding of every node in the database molecules and compares them with the entered substructure.
2. Substructure search with depth-first (DF) pattern. The DF algorithm executes the search operation of the entered molecule in a depth-first manner (bond by bond). Therefore, this algorithm utilizes backtracking search iterating over the bonds of entered molecules.
3. Substructure search with the Vento-Foggia algorithm. The Vento-Foggia algorithm iteratively extends a partial solution using a set of feasibility criteria to decide whether to extend or backtrack.  In the Ullmann algorithm, the node-atom mapping is fixed in every step. In contrast, the Vento-Foggia algorithm iteratively adds node-atom pairs to a current solution. In that way, this algorithm directly discovers the topology of the substructure and seeks for all natural products that contain the entered substructure.

In all three cases, the software output is a group of compounds that contain drawn substructures.


#### Similarity search

[Tanimoto threshold](https://en.wikipedia.org/wiki/Chemical_similarity) is being used for pursuing a similarity search.
When a user specifies the Tanimoto threshold, our search engine is looking for all compounds that have Sab greater than or equal to the inputted value of the Tanimoto coefficient.


### Advanced search

Advanced search enables users to search for a compound of their interest by specifying structural properties and molecular descriptors. Molecular descriptors represent the properties of the molecules that are computed by algorithms. The numerical values of molecular descriptors are used to quantitatively express the physical and chemical characteristics of the molecules. 
Another advantage of advanced search is the ability to select the search in one of the data sources used to compile the overall database of our site.



### Rest API

Rest API is an application program interface where users  utilize  HTTP requests to put and then get data about natural products. The Rest API uses less bandwidth than other search methods. Therefore, the Rest API is a faster search method due to highly efficient internet usage.
There are following search options via Rest API:

#### Exact search 

1. The user should enter the SMILES structural formula of the molecule after which software searches for the corresponding InChl match in the database.
Example: URL link for O=C1OC(C(O)=C1O)CO  search

    https://coconut.naturalproducts.net/api/search/exact-structure?type=inchi&smiles=O=C1OC(C(O)=C1O)CO 
    
2. The user should enter the SMILES structural formula of the molecule  after which software searches for the particular natural product by matching the same SMILES formula in the database. 
Example: URL link for O=C1OC(C(O)=C1O)CO  search

    https://coconut.naturalproducts.net/api/search/exact-structure?type=smiles&smiles=O=C1OC(C(O)=C1O)CO    

In both cases, the user should use the provided URL links by modifying the part after the equals sign where he should write the formula of his interest.


#### Simple search 

The user may pursue a simple search by entering the following: Coconut ID, InChl, InChl key, and molecule name. 
Example: URL link for searching of a particular compound by entering its Coconut ID

    https://coconut.naturalproducts.net/api/search/simple?query=CNP0253154 
    
The user should use the same URL link by modifying the part after the equals sign where he should write the desired compound  in any of the above-mentioned forms. The user may enter a compound in any of the four available forms without specifying which form he used.

#### Substructure search
An example of URL link for substructure search:

    https://coconut.naturalproducts.net/api/search/substructure?type=default&max-hits=100&smiles=O=C1OC(C(O)=C1O)CO 

The user should use the above-presented URL link by adjusting the following options:
* type
    * default for detecting the substructure with the Ullmann algorithm
    * df for detecting the substructure with depth-first pattern
    * vf for detecting the substructure with Vento-Foggia algorithm
* max-hits represents the maximum number of natural products to be displayed. 




### Data organization of natural products

Data items are separated into sections for easier analysis of compounds. While the user is on a page of the particular natural product, he can proceed directly to a section of his interest by clicking on it.
The list of  available sections at the natural products page:

* The overview
* Representations
* Synonyms
* Molecular properties
* Computed properties
* Note: We could write here about the software/application that was used for computation.
* Known stereochemical variants
* References (literature)
* Cross references to other chemical databases


###  Downloads
COCONUT Online offers the different download options of fragments or a complete database with all information included.

1. Download Natural Products Structures in SDF format. The SDF (structure data file) represents a chemical data file format developed by MDL. In this type of format, the natural products are delimited by lines consisting of four dollar signs ($$$$). All associated data items are denoted for every natural product in the database.
2. Download the complete COCONUT dataset as a MongoDB dump. Using this option, all datasets are imported with the same visual depiction as it is at the Website.
3. Download Natural Products Structures in SMILES format


### Data sources

COCONUT Online uses more than 50 open natural product resources.  One of the options of advanced search is the specification of one or more available resources where the search is going to be pursued.




